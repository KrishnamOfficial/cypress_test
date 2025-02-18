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
                sh 'npm ci'  // More reliable than 'npm install' for CI/CD
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                script {
                    try {
                        sh 'npx cypress run'
                    } catch (Exception e) {
                        echo "Cypress tests failed, but continuing..."
                    }
                }
            }
        }
        
        stage('Publish Test Results') {
            steps {
                junit '**/results/*.xml'  // Works if Mocha JUnit Reporter is configured
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/cypress/screenshots/**, **/cypress/videos/**'
        }
        failure {
            echo "Build failed. Check logs for errors."
        }
    }
}
