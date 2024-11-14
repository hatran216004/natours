# The most important principle is: Structure your data to match the ways that your application queries and updates data.

# In other words: Identify the questions that arise from your application's use cases first, and then model your data so that the questions can get answered in the most efficient way.

# In general, always favor embedding, unless there is a good reason not to embed. Especially on 1:FEW and 1:MANY relationship.

# A 1:TON or MANY:MANY relationship is usually a good reason to reference instead of embedding.

# Also, favor referencing when data is updated a lot and if you need to frequently access a dataset on its own.

# Use embedding when data is mostly read but rarely updated, and when two datasets belong intrinsically together.

# Don't allow arrays to grow indenfinitely. Therefore, if you need to normalize, use child referencing for 1:MANY relationships, and parent referencing for 1:TON relationships.

# Use two-way referencing for MANY:MANY relationships

---

# EMBEDDING : 1: FEW, 1:MANY

# REFERENCING: 1:MANY, 1:TON, MANY:MANY
