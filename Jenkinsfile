pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'nodejs-18'  // Ensure 'nodejs-18' is configured in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/KrishnamOfficial/cypress_test.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // Ensures a clean and reproducible installation
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        sh 'npx cypress run --browser chrome --headless --disable-gpu'
                    }
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                junit '**/cypress/reports/junit/*.xml'  // Requires Mocha JUnit Reporter
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                script {
                    sh 'npx mochawesome-merge cypress/reports/mocha/*.json -o cypress/reports/mochawesome.json'
                    sh 'npx marge cypress/reports/mochawesome.json -o cypress/reports/html'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/cypress/screenshots/**, **/cypress/videos/**, **/cypress/reports/html/**'
        }
        failure {
            echo "Build failed. Check logs for errors."

            // Uncomment the following lines to send email on failure
            // mail to: 'your-email@example.com',
            //      subject: "Jenkins Build Failed: ${env.JOB_NAME}",
            //      body: "Check Jenkins logs for details: ${env.BUILD_URL}"
        }
    }
}
