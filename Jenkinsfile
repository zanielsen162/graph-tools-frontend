pipeline {
    agent {
        label 'podman'
    }
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build') {
            steps {
                script {
                    sh 'podman build --memory=6g --format docker --tag graph-tools-frontend --pull --force-rm --no-cache .'
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         container('podman') { 
        //             sh 'podman run -d --name=graph-tools-frontend --rm --pull=never -p 3000:3000 graph-tools-frontend' 
        //             sh 'sleep 10 && curl -v http://localhost:3000/health 2>&1 | grep -Po "HTTP\\S+ [0-9]{3} .*"'
        //             sh 'podman exec graph-tools-frontend npm test'
        //         }
        //     }
        //     post {
        //         always {
        //             container('podman') {                        
        //                 sh 'podman rm -fv graph-tools-frontend'
        //             }
        //         }
        //     }
        // }

        stage('Deploy - Staging') {
            steps {
                echo 'Deploying staging....'
            }
        }

        stage('Deploy - Production') {
            steps {
                echo 'Deploying production....'
            }
        }
    }
}