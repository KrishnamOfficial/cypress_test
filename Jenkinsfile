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
                        sh 'npx cypress run --browser chrome --headless'
                    }
                }
            }
        }

        // stage('Publish Test Results') {
        //     steps {
        //         junit '**/cypress/reports/junit/*.xml'  // Ensure JUnit reporter is configured
        //     }
        // }

        // stage('Generate Mochawesome Report') {
        //     steps {
        //         script {
        //             echo "Generating Mochawesome Report..."
        //             sh '''
        //                 mkdir -p cypress/reports/html
        //                 npx mochawesome-merge cypress/reports/mocha/*.json -o cypress/reports/mochawesome.json || echo "No JSON reports found, skipping merge"
        //                 npx marge cypress/reports/mochawesome.json -o cypress/reports/mocha || echo "No JSON reports found, skipping HTML generation"
        //             '''
        //         }
        //     }
        // }

        stage('Send Email with Report') {
            steps {
                script {
                    def reportPath = "cypress/reports/mocha/index.html"
                    if (fileExists(reportPath)) {
                        echo "Sending email with report..."
                        emailext attachmentsPattern: reportPath,
                                 subject: "Cypress Test Report - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                                 body: "The Cypress test report is attached.\n\nBuild URL: ${env.BUILD_URL}",
                                 to: 'Ayush.pathak@mechlintech.com'
                    } else {
                        echo "Report not found, skipping email."
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/mocha/index.html'
        }

        failure {
            echo "Build failed. Check logs for errors."

            // Uncomment to send failure notification email
            // mail to: 'your-email@example.com',
            //      subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //      body: "Check Jenkins logs for details: ${env.BUILD_URL}"
        }
    }
}
