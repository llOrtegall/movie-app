pipeline {
    agent any

    tools {
        nodejs 'node-v22'
    }

    stages {
        stage('Build') {
          steps {
            sh 'bun install'
            sh 'bun run build'
          }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}