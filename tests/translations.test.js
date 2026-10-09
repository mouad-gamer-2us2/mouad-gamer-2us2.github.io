import { test } from "node:test";
import assert from "node:assert/strict";
import { translate, translations } from "../src/i18n/translations.js";
import { profile, education, experiences } from "../src/data/profile.js";
import { projects } from "../src/data/projects.js";
import { journey } from "../src/data/journey.js";

test("English and German cover biographies, gallery and every project detail", () => {
  const content = [
    profile.bio,
    profile.intro,
    profile.objective,
    profile.title,
    profile.status,
    ...profile.roles,
    ...profile.strengths,
    ...profile.languages.flat(),
    ...profile.events.map((e) => e.text),
    ...education.flatMap((e) => [e.title, e.description]).filter(Boolean),
    ...experiences.flatMap((e) => [e.title, ...e.bullets]),
    ...projects.flatMap((p) => [p.summary, p.objective, ...p.actions]),
    ...journey.flatMap((j) => [j.text, j.alt]),
  ];
  for (const text of content) {
    for (const locale of ["en", "de"]) {
      assert.ok(translations[text]?.[locale], `Missing ${locale}: ${text}`);
    }
  }
});

test("language switching preserves French accents, proper names and destinations", () => {
  for (const text of [profile.bio, "Sécurité informatique", "À propos"]) {
    assert.equal(translate(text, "fr"), text);
  }
  for (const locale of ["fr", "en", "de"]) {
    for (const text of [
      profile.name,
      profile.github,
      profile.cv,
      "pfSense",
      "#projets",
    ]) {
      assert.equal(translate(text, locale), text);
    }
  }
  assert.equal(translate("\n  À propos  ", "en"), "\n  About  ");
  assert.equal(translate("À propos", "de"), "Über mich");
  assert.equal(translate("À propos", "unsupported"), "À propos");
});
