'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log(formData)
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-8">Contact Me</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-2 border rounded h-32"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}
