# ⚡ Registration of Interest for iPhone - A registration of interest Create/Read for new iPhone models with role based access

This is a web application which allows consumers to register their interest for the new iPhone models with the **epanorama.pk** store (an authorized Apple Reseller). 
Diving into the technical details, it is a React + TypeScript application built with **Vite**, containerized using **Docker** and **NGINX**, and deployed on **Amazon Web Services (AWS)** using ECS Fargate, ECR, SSM Parameter Store, Load Balancer, and ACM for SSL. The staging environment is protected using **Cognito** authentication. **GitHub Actions** handles the CI/CD pipeline. DNS is managed through **Route 53**, with the domain registered on **GoDaddy**.

---

## 🗺️ Modules

- Consumer-facing form to record registrations
- Admin Panel with Registrations displayed to see and contact the people interested

---

---

## 📌 Tech Stack + Infra

- ⚛️ **React + Vite (TS)** for a modern frontend stack
- 📝 **Formik + Yup** for form handling and validations
- 🎨 **Ant Design + SASS** for styling
- 🐳 **Docker + NGINX** for static file serving
- 🚢 **Amazon ECS (Fargate)** for serverless containers
- 📦 **Amazon ECR** for container image hosting
- 🔐 **AWS SSM Parameter Store** for secrets management
- 🔐 **AWS ACM** for HTTPS/SSL Certificate
- 🔐 **Amazon Cognito** basic authentication (staging only)
- ⚙️ **GitHub Actions** for CI/CD automation
- 🌐 **Route 53 Hosted Zone** for DNS
- 🌍 **GoDaddy** for domain registration
- 💾 **Supabase** for database
- 🔔 **EmailJS** to notify users about their registration

---

## 🌐 Environments

| Environment | URL                                  | Authentication |
|-------------|--------------------------------------|----------------|
| Staging     | `https://stage.epanorama-iphone.com` | Cognito Login  |
| Production  | `https://www.epanorama-iphone.com`   | Public         |

---
