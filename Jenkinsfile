pipeline {
    agent any

    environment {
        registry = "zanielsen162/graph-tools-frontend"
        registryCredential = 'docker-personal'
        dockerImageTag = "latest"
    }

    stages {
        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Check kubectl') {
            steps {
                withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]) {
                    sh 'kubectl version --client --short || echo "kubectl not found"'
                }
            }
        }

        stage('Debug PATH') {
            steps {
                sh 'whoami'
                sh 'echo $PATH'
                sh 'ls -l /usr/local/bin/kubectl'
                sh 'which kubectl || echo "kubectl not found in PATH"'
            }
        }

        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build("${registry}:${dockerImageTag}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploying Container to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}
