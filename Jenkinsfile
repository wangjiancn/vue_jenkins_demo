pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image "${env.DOCKER_REG_ALI}/node:0.1"
                    args '-v $HOME/.npm:/root/.npm  -v /var/cache/container/apk/cache:/etc/apk/cache'   // 依赖webpack，需要每次安装
                    registryUrl "https://${env.DOCKER_REG_ALI}"
                    registryCredentialsId "docker"
                }
            }
            steps {
                sh 'npm install --registry https://registry.npm.taobao.org && npm run build' 
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sshagent (credentials: ['ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${env.REMOTE_SERVER} mkdir -p '~'/vue_blog_dist_from_ci/\$(date +'%Y%m%d')-${env.BUILD_ID}
                    scp -o StrictHostKeyChecking=no -r dist ${env.REMOTE_SERVER}:~/vue_blog_dist_from_ci/\$(date +'%Y%m%d')-${env.BUILD_ID}
                    ssh -o StrictHostKeyChecking=no ${env.REMOTE_SERVER}<< EOF
                    echo build date: `date +'%FT%T%:z'` >> Jenkins_history.log
                    echo BUILD: ${env.JOB_BASE_NAME}:${env.BUILD_ID} >> Jenkins_history.log
                    echo ------------- >> Jenkins_history.log
                    EOF
                    """.stripIndent()
                }
            }
        }
    }
}

