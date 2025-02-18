pipeline {
    agent any
    
    environment {
        NODEJS_HOME = tool 'nodejs-18'  // Use the Node.js version installed in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-repo.git'  // Replace with your repository
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
        
        stage('Publish Test Results') {
            steps {
                junit '**/results/*.xml'  // If using Mocha JUnit Reporter
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/cypress/screenshots/**, **/cypress/videos/**', onlyIfSuccessful: true
        }
    }
}
