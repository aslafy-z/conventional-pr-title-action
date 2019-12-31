const validateTitle = require('./validateTitle');
const installPreset = require('./installPreset');

const preset = 'conventional-changelog-angular';

// Install preset (takes some time)
jest.setTimeout(30000);
beforeAll(async (done) => {
  try {
    await installPreset(preset);
  } catch (err) {
    done.fail(err);
  }
  done();
})

it('detects valid PR titles', async () => {
  const inputs = [
    'fix: Fix bug',
    'fix!: Fix bug',
    'feat: Add feature',
    'feat!: Add feature',
    'refactor: Internal cleanup'
  ];

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    await validateTitle(preset, input);
  }
});

it('throws for PR titles without a type', async () => {
  await expect(validateTitle(preset, 'Fix bug')).rejects.toThrow(
    /No release type found in pull request title "Fix bug"./
  );
});

it('throws for PR titles with an unknown type', async () => {
  await expect(validateTitle(preset, 'foo: Bar')).rejects.toThrow(
    /Unknown release type "foo" found in pull request title "foo: Bar"./
  );
});
