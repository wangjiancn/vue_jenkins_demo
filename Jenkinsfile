pipeline {
    agent {
        docker {
            image 'node:12-alpine'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
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
