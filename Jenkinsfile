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
                    sh 'podman build --format docker --tag graph-tools-frontend --pull --force-rm --no-cache .'
                }
            }
        }

        stage('Test') {
            steps {
                script { 
                    sh 'podman run -d --name=graph-tools-frontend --rm --pull=never -p 3000:3000 graph-tools-frontend' 
                    sh 'podman exec graph-tools-frontend npm test'
                }
            }
            post {
                always {
                    sh 'podman rm -fv graph-tools-frontend'
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh 'kubectl apply -f k8s/namespace-dev.yaml'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }

        stage('Test Deployment') {
            steps {
                sh 'sleep 10 && curl -v http://graph-tools-frontend-service.graph-tools-dev:3000/health 2>&1 | grep "^< HTTP/.* [0-9][0-9][0-9]"'
            }
        }
    }
}