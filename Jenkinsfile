pipeline {
    agent any

    environment {
        registry = "zanielsen162/graph-tools-frontend"
        registryCredential = 'docker-personal'
        dockerImageTag = "latest"
    }

    tools {
        dockerTool 'docker-latest'
    }

    stages {
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
                script {
                    kubernetesDeploy(
                        kubeconfigId: 'kube-config',
                        configs: ['k8s/deployment.yaml', 'k8s/service.yaml']
                    )
                }
            }
        }
    }
}
