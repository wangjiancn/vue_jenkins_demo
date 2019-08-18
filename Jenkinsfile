pipeline {
    agent none
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
                /* 依赖webpack，需要每次安装 */
                sh 'npm install --registry https://registry.npm.taobao.org' 
                sh 'npm run build'
                sh "echo build"
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sh "echo Deploy testd"
                sh "ssh ${env.REMOTE_SERVER} 'date >> testJenkinsDeploy;${env.BUILD_ID}>>testJenkinsDeploy'"
                sh "echo 'after ssh' >> testJenkinsDeploy"
            }
        }
    }
}
