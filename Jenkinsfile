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
    }
}
