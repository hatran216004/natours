const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

// defines structured data for documents
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name mus have less or equals than 40 charactors'],
      minlength: [10, 'A tour name mus have more or equals than 10 charactors'],
      // validate: [validator.isAlpha, 'Tour name mus only contain charactors'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficult is either: easy, medium, difficulty',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating mus be above 1.0'],
      max: [5, 'A rating mus be below 5.0'],
      set: (value) => Math.round(value * 10) / 10, // 4.666667 * 10 => 46.66667 => 47 / 10 = 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        // this only works on CREATE and SAVE 💥
        validator: function (val) {
          // val: value is input from client
          // "this" only points to current document on NEW document creation
          return val < this.price;
        },
        message: 'Discount price {VALUE} should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON - need at least two field names
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number], //  [kinh độ, vĩ độ] (longitude, latitude)
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: String,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  // 'this' is going to be pointing to the current document
  return this.duration / 7;
});

// Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before an actual event: .save() and .create()
tourSchema.pre('save', function (next) {
  // 'this' is going to be pointing to the current document
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// QUERY MIDDLEWARE: runs before any find query is executed
tourSchema.pre(/^find/, function (next) {
  // 'this' is going to be pointing to the current query object
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
// QUERY MIDDLEWARE: runs after any find query is executed
tourSchema.post(/^find/, function (docs, next) {
  console.log(`This Query took ${Date.now() - this.start} miliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE: allow us to add hooks before or after an aggregation happens
tourSchema.pre('aggregate', function (next) {
  // 'this' is going to be pointing to the current aggregate object
  if (!('$geoNear' in this.pipeline()[0])) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  }
  // console.log(this.pipeline());
  next();
});

// create model for Tour
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
