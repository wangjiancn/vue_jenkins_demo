pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        /* 依赖webpack，需要每次安装 */
        stage('Build') {
            agent {
                docker {
                    image 'node:12-alpine'
                    args '-v $HOME/.npm:/root/.npm -v $HOME/.ssh:/root/.ssh'
                }
            }
            steps {
                sh 'apk update && apk add --no-cache openssh'
                sh 'npm install --registry https://registry.npm.taobao.org && npm run build' 
                sh "ssh ${env.REMOTE_SERVER} 'date >> testJenkinsDeploy;echo BUILD_ID:${env.BUILD_ID} >>testJenkinsDeploy'"
                sh "scp -r ${env.WORKSPACE}/dist  ${env.REMOTE_SERVER}:vue_blog_dist_from_ci_node"
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sh "echo Deploy testd"
                sh "ssh ${env.REMOTE_SERVER} 'echo WORKSPACE:${env.WORKSPACE} >>testJenkinsDeploy'"
                sh "scp -r ${env.WORKSPACE}/dist  ${env.REMOTE_SERVER}:vue_blog_dist_from_ci"
            }
        }
    }
}
