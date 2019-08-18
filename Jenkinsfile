pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        /* 依赖webpack，需要每次安装 */
        /*
        stage('Build') {
            agent {
                docker {
                    image 'node:12-alpine'
                }
            }
            steps {
                sh 'npm install --registry https://registry.npm.taobao.org' 
                sh 'npm run build'
                sh "echo build"
            }
        }
        */
        stage('Deploy') {
            agent any
            steps {
                sh "echo Deploy testd"
                sh "ssh ${env.REMOTE_SERVER} 'date >> testJenkinsDeploy;echo BUILD_ID:${env.BUILD_ID} >>testJenkinsDeploy'"
                sh "ssh ${env.REMOTE_SERVER} 'echo WORKSPACE:${env.WORKSPACE} >>testJenkinsDeploy'"
                sh "ssh ${env.REMOTE_SERVER} 'echo $(pwd) >>testJenkinsDeploy'"
                sh "scp -r ${env.WORKSPACE}/dist  ${env.REMOTE_SERVER}"
            }
        }
    }
}
