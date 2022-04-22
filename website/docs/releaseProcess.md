---
title: Release process
---

# Release process

## Part 1

You need a `GITHUB_TOKEN` in your [`.env`](https://github.com/algolia/api-clients-automation/blob/main/.env.example) file at the root of the repository. You can generate one from the [personal access token page](https://github.com/settings/tokens/new) with `Repo (Full control of private repositories)` scope.

```
GITHUB_TOKEN=<YOUR-PERSONAL-ACCESS-TOKEN>
```

Once setup, you can run

```bash
yarn release
```

It will create [a release issue](https://github.com/algolia/api-clients-automation/issues/220).

## Part 2

You need to review the release issue, in two parts:

1.  version changes
2.  CHANGELOGs

Any changes applied in the issue will be taken into account by the release process.

Clicking "Approved" to approve the release, and closing it, will trigger the [Part 3](#part-3).

## Part 3

The [GitHub action release](https://github.com/algolia/api-clients-automation/blob/main/.github/workflows/process-release.yml) is triggered. It generates clients and push changes to each language repository on their `next` branch.

This Part 3 runs conditionally according to what has been done in Part 2. Under "Version Changes" section of the release issue, if a language is checked, this Part 3 will creates a commit like `chore: release v<NEXT-VERSION>` in each repository. If it is not checked, it will create a commit like `chore: update repo <DATE-STAMP>`.

Each language repository should have their own release process, and should run only when the latest commit starts with `chore: release`. By doing so, we have a way to just update the repository, for example READMEs, without having to release.

## Releasing manually

### Java

Java is released to [sonatype](https://oss.sonatype.org/) before being sent to [Maven](https://search.maven.org/artifact/com.algolia/algoliasearch-core) central repository, the `jar` need to be signed before publishing, and then verified on sonatype by using `closeAndRelease` target on Gradle.
All of this is handled in the [release action](https://github.com/algolia/algoliasearch-client-java-2/tree/next/.github/workflows/release.yml), executed on the [Java repository](https://github.com/algolia/algoliasearch-client-java-2).
If you want to release manually, you need to copy some secrets to either:
- `clients/algoliasearch-client-java-2/gradle.properties` /!\ make sure to remove them before committing !
- `~/.gradle/gradle.properties` which is safer because it's not committed and can stay on your computer.

The secrets are fetched from the vault, make sure you have access to `api-clients-squad`, and then read the value and place them in the `gradle.properties` file you want (don't copy this file verbatim):
```bash
signingInMemoryKey="$(vault read -field sub_private_key secret/algolia/api-clients-squad/maven-signing | awk 'NR == 1 { } 1' ORS='\\n')"
signingInMemoryKeyId=$(vault read -field subkey_id secret/algolia/api-clients-squad/maven-signing)
signingInMemoryKeyPassword=$(vault read -field password secret/algolia/api-clients-squad/maven-signing)

mavenCentralUsername=$(vault read -field user secret/algolia/api-clients-squad/sonatype)
mavenCentralPassword=$(vault read -field password secret/algolia/api-clients-squad/sonatype)
```

To release a snapshot, you need to add `-SNAPSHOT` to the `VERSION_NAME` in `clients/algoliasearch-client-java-2/gradle.properties`, then to release run:
` ./gradle/gradlew -p clients/algoliasearch-client-java-2 --no-parallel publish`

And if it's not a snapshot, run:
` ./gradle/gradlew -p clients/algoliasearch-client-java-2 closeAndReleaseRepository`

Once the package is published, it can be used in gradle file as:
```gradle
repositories {
    mavenCentral()
    maven { url = "https://oss.sonatype.org/content/repositories/snapshots/" }
}

dependencies {
    implementation 'com.algolia:algoliasearch-core:0.0.1-SNAPSHOT'
}
```

If it's not a snapshot, you can ignore the sonatype repository.
