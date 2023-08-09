const validateTitle = require('./validateTitle');
const installPreset = require('./installPreset');

const preset = 'conventional-changelog-conventionalcommits';

// Install preset (takes some time)
jest.setTimeout(30000);
beforeAll(async () => {
  return new Promise(resolve => {
    resolve(installPreset(preset))
  });
});

it('detects valid PR titles', async () => {
  const inputs = [
    "fix: Fix bug",
    "fix: Fix bug\n\nBREAKING CHANGE: Fix bug",
    "feat: Add feature",
    "feat: Add feature\n\nBREAKING CHANGE: Add feature",
    "feat(scope): Add feature",
    "feat(scope): Add feature\n\nBREAKING CHANGE: Add feature",
    "feat(scope)!: Add feature with breaking change",
    "refactor: Internal cleanup",
    "feat!: Add feature with breaking change"
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
