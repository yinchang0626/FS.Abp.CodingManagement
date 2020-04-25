module.exports = {
  name: 'coding-management',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/coding-management',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
