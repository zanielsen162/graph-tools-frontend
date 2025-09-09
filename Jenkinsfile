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
                    sh 'podman run -it --rm --pull=never localhost/graph-tools-frontend npm test --reporter=list'
                    sh 'podman run -it --rm --pull=never localhost/graph-tools-frontend npx playwright test'
                    sh 'podman run -d --name=graph-tools-frontend --rm --pull=never -p 3000:3000 localhost/lsit-selfportal-frontend'
                    sh 'sleep 10 && curl -v http://localhost:3000/health 2>&1 | grep -P "HTTP\\S+\\s200\\s+[\\w\\s]+\\s*$"'

                }
            }
            post {
                always {
                    sh 'podman rm -fv lsit-selfportal-frontend'
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