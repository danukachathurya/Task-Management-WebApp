import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Intern Task Management System
              </h1>
              <p className="text-xl text-gray-600">
                Streamline your workflow and boost productivity with our
                comprehensive task management solution.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-10 transform rotate-3"></div>
                <div className="absolute inset-0 bg-primary rounded-lg opacity-10 transform -rotate-3"></div>
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Task Management Dashboard"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Powerful Features for Task Management
            </h2>
            <p className="text-gray-600 mt-2">
              Everything you need to manage intern tasks efficiently
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
                <p className="text-gray-600">
                  Easily create, edit, and track progress of all assigned tasks
                  in one place.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">PDF Reports</h3>
                <p className="text-gray-600">
                  Generate comprehensive PDF reports with task details and
                  status updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to improve your task management?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get started today and transform how you assign and track tasks.
          </p>
        </div>
      </div>
      
    </div>
  );
}
