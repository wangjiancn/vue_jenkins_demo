pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-p 3010:3010'
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
