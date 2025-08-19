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
                    sh 'podman run -d --network=host --name graph-tools-frontend-test graph-tools-frontend'
                    sh 'podman build -t e2e-test-image -f Containerfile.test .'
                    sh 'podman run --network=host --rm e2e-test-image'
                    sh 'podman rm -fv graph-tools-frontend-test'
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "podman login docker.io -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh 'podman tag graph-tools-frontend docker.io/zanielsen162/graph-tools-frontend:latest'
                    sh 'podman push docker.io/zanielsen162/graph-tools-frontend:latest'
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