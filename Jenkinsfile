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
                    image "$DOCKER_ALI/node:0.1"
                    args '-v $HOME/.npm:/root/.npm  -v /var/cache/container/apk/cache:/etc/apk/cache'
                }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: '001',keyFileVariable:'CERT')]){
                    sh 'find -maxdepth 2'
                    sh "echo ${env.WORKSPACE}"
                    sh 'pwd'
                    sh 'touch build/test.file'
                    stash includes:"build/**",name:" buildConf"
                    sh 'npm install --registry https://registry.npm.taobao.org && npm run build' 
                    sh 'find dist -maxdepth 3'
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                    sshagent (credentials: ['001']) {
                        sh "tar czv dist | ssh -o StrictHostKeyChecking=no ${env.REMOTE_SERVER} 'tar xz $HOME/vue_blog_dist_from_ci'"
                        sh """
                        ssh -o StrictHostKeyChecking=no ${env.REMOTE_SERVER} << EOF
                        date >> testJenkinsDeploy
                        echo BUILD_ID:${env.BUILD_ID} >>testJenkinsDeploy
                        echo 'test single' >> testJenkinsDeploy
                        EOF
                        """.stripIndent()
                  }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                unstash 'buildConf'
                sh 'ls'
                sh 'find -maxdepth 2 -type d -ls'
                sh "echo Deploy completed"
            }
        }
    }
}
