---
"reader": major
---

Reader now uses @teal-owl/watermarking hashing functions. This functions automatically removes formatting characters (\n, \t, ...) from text before hashing. This fixes some hashing problems between publisher and reader. THIS IS A BREAKING CHANGE. Reader won't be able to validate hashes generated with old publisher.
