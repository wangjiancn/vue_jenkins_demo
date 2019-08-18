pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
        agent {
            docker {
                image 'node:12-alpine'
            }
        }
            steps {
                sh 'npm install --registry https://registry.npm.taobao.org && npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh "echo Deploy testd"
                sh "ssh ${env.REMOTE_SERVER} | \"cd $HOME && touch env.BUILD_ID\""
            }
        }
    }
}
