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
                    args '-v $HOME/.npm:/root/.npm -v "$HOME/.ssh":/root/.ssh -v /var/cache/container/apk/cache:/etc/apk/cache'
                }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: '001',keyFileVariable:'KEY')]){
                    sh 'ls /root/.ssh/'
                    sh 'apk update && apk add openssh'
                    sh "echo $KEY"
                    sh "ssh -i $KEY ${env.REMOTE_SERVER} 'date >> testJenkinsDeploy;echo BUILD_ID:${env.BUILD_ID} >>testJenkinsDeploy'"
                    sh 'touch build/test.file'
                   sh 'ls build'
                    stash includes:"build/**",name:" buildConf"
                    /*
                    sh 'pwd'
                    sh 'apk update && apk add --no-cache openssh'
                    sh 'npm install --registry https://registry.npm.taobao.org && npm run build' 
                    sh 'ls dist'
                    */
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                unstash 'buildConf'
                sh 'ls build'
                sh 'ls .'
                sh "ssh ${env.REMOTE_SERVER} 'date >> testJenkinsDeploy;echo BUILD_ID:${env.BUILD_ID} >>testJenkinsDeploy'"
                sh "scp -r ${env.WORKSPACE}/dist  ${env.REMOTE_SERVER}:vue_blog_dist_from_ci_node"
                sh "echo Deploy testd"
                sh "ssh ${env.REMOTE_SERVER} 'echo WORKSPACE:${env.WORKSPACE} >>testJenkinsDeploy'"
                sh "scp -r ${env.WORKSPACE}/dist  ${env.REMOTE_SERVER}:vue_blog_dist_from_ci"
            }
        }
    }
}
