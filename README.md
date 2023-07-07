# retailcore-mfe-auth

## Run Quality Check locally with SonarQube

### Implement Sonarqube Locally

1. [Download Java 11](https://adoptium.net/releases.html?variant=openjdk11&jvmVariant=hotspot) and run `java --version` to check if installation is successful
2. [Download Sonarqube](https://www.sonarqube.org/downloads/) and run `ls -l sonarqube-9.6.1.59531.zip` to unzip the file
3. Move the unzipped sonarqube to a new folder by running `udo mv sonarqube-9.6.1.59531 /opt/sonarqube`
4. Start Sonarqube by running the command `/opt/sonarqube/bin/macosx-universal-64/sonar.sh console`
5. Visit [http://localhost:9000/](http://localhost:9000/) and use _admin_ and _admin_ as username and password respectively. You'll be prompted to change the password afterwards.
6. Once logged in create a project on Sonaqube by clicking "Manually"
7. Enter Project name and Project key as the current project name eg 'retailcore-mfe-auth' and click Setup
8. Click 'Locally' on the this page and generate a token on the next and click on Next
9. Click "Other(For JS, TS, Python, PHP, ...)
10. Select your current OS
11. Install Sonar Reporter and Scanner if they don't already exist as devDependencies in the package.json by runnine `yarn add -D jest-sonar-reporter sonarqube-scanner`
12. Rune `yarn sonar-scanner \
-Dsonar.projectKey=retailcore-mfe-auth \
-Dsonar.sources=. \
-Dsonar.host.url=http://localhost:9000 \
-Dsonar.token=sqp_d15c36f3894f8fa79c7c2c4da4080507354cb987`

where `sqp_d15c36f3894f8fa79c7c2c4da4080507354cb987` is the token generated in step 8

### Running Docker

`docker build -t retailcore-auth .`
`docker run -p 8080:80 retailcore-auth`
To clean up your registry, run `docker builder prune --force`
