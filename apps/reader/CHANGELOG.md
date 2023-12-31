# reader

## 2.0.0

### Major Changes

- 395e675: Reader now uses @teal-owl/watermarking hashing functions. This functions automatically removes formatting characters (\n, \t, ...) from text before hashing. This fixes some hashing problems between publisher and reader. THIS IS A BREAKING CHANGE. Reader won't be able to validate hashes generated with old publisher.

### Patch Changes

- Updated dependencies [e6c67c1]
- Updated dependencies [a17f55a]
  - @teal-owl/watermarking@0.2.0

## 1.2.0

### Minor Changes

- 8406277: Reader new shows list of paragraphs with relative informations in popup window

### Patch Changes

- 8406277: Cache manifests and watermarks using chrome session storage
- 8406277: Popup now shows watermarks without manifest in a separate section instead of hiding them
- Updated dependencies [9a710bf]
- Updated dependencies [9a710bf]
  - @teal-owl/ipfs-utils@1.1.0
  - @teal-owl/watermarking@0.1.0
