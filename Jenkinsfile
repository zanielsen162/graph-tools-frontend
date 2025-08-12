pipeline {
    agent any

    options {
        skipStagesAfterUnstable()
    }

    environment {
        registry = 'zanielsen162/graph-tools-frontend'
        registryCredential = 'docker-personal'
        dockerImageTag = 'latest'
    }

    stages {
        stage('Check Installs') {
            steps {
                sh 'docker --version'
                sh 'kubectl version --client'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    sh 'docker build --tag zanielsen162/graph-tools-frontend --pull --force-rm --no-cache .'
                }
            }
        }

        stage('Run Jest Tests') {
            steps {
                script {
                    sh "docker run --rm -v /app -w /app zanielsen162/graph-tools-frontend npm test"
                }
                echo 'finished testing'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: registryCredential, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh "docker push zanielsen162/graph-tools-frontend"
                }
            }
        }

        stage('Deploying Container to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -n graph-tools -f k8s/deployment.yaml'
                    sh 'kubectl apply -n graph-tools -f k8s/service.yaml'
                }
            }
        }

        stage('Testing Container') {
            steps {
                sh 'sleep 10 && curl -v http://192.168.49.2:31000/health 2>&1 | grep -Po "HTTP\\S+ [0-9]{3} .*"'
            }
        }
    }
}
