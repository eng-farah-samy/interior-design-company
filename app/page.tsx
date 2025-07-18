"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Star,
  Calendar,
  Users,
  Award,
  Briefcase,
  Zap,
  Heart,
  Coffee,
  MessageCircle,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Animated particles component for background
const AnimatedParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
    }>
  >([])

  useEffect(() => {
    const colors = ["#60A5FA", "#A78BFA", "#34D399", "#FBBF24", "#F87171", "#FB7185"]
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-40 animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  )
}

// Neural Network component for hero section only
const HeroNeuralNetwork = () => {
  const [nodes, setNodes] = useState<
    Array<{
      id: number
      x: number
      y: number
      baseX: number
      baseY: number
      angle: number
      radius: number
      speed: number
      connections: number[]
    }>
  >([])

  useEffect(() => {
    const nodeCount = 50
    const heroHeight = 600 // Approximate hero section height
    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      const baseX = Math.random() * window.innerWidth
      const baseY = Math.random() * heroHeight
      return {
        id: i,
        x: baseX,
        y: baseY,
        baseX: baseX,
        baseY: baseY,
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 50,
        speed: 0.01 + Math.random() * 0.02,
        connections: [],
      }
    })

    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      const connections: number[] = []
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.baseX - otherNode.baseX, 2) + Math.pow(node.baseY - otherNode.baseY, 2),
          )
          if (distance < 120 && connections.length < 3) {
            connections.push(j)
          }
        }
      })
      node.connections = connections
    })

    setNodes(newNodes)

    const animateNodes = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const newAngle = node.angle + node.speed
          const newX = node.baseX + Math.cos(newAngle) * node.radius
          const newY = node.baseY + Math.sin(newAngle) * node.radius

          return {
            ...node,
            x: newX,
            y: newY,
            angle: newAngle,
          }
        }),
      )
    }

    const interval = setInterval(animateNodes, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full">
        {/* Render connections */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const connectedNode = nodes[connectionId]
            if (!connectedNode) return null

            const distance = Math.sqrt(Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2))
            const opacity = Math.max(0, 1 - distance / 120)

            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={node.x}
                y1={node.y}
                x2={connectedNode.x}
                y2={connectedNode.y}
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1.5"
                opacity={opacity}
                className="neural-connection"
                style={{
                  filter: `drop-shadow(0 0 3px rgba(59, 130, 246, ${opacity * 0.6}))`,
                }}
              />
            )
          }),
        )}

        {/* Render nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="rgba(59, 130, 246, 0.9)"
              className="neural-node"
              style={{
                filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))",
              }}
            />
            {/* Pulsing rings around some nodes */}
            {node.id % 8 === 0 && (
              <>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  className="animate-ping"
                  style={{
                    animationDuration: "2s",
                    animationDelay: `${(node.id % 4) * 0.5}s`,
                  }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.2)"
                  strokeWidth="1"
                  className="animate-ping"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${(node.id % 4) * 0.7}s`,
                  }}
                />
              </>
            )}
          </g>
        ))}

        {/* Add some flowing energy lines */}
        {nodes.slice(0, 8).map((node, index) => (
          <g key={`energy-${node.id}`}>
            <path
              d={`M ${node.x - 30} ${node.y} Q ${node.x} ${node.y - 20} ${node.x + 30} ${node.y}`}
              fill="none"
              stroke="rgba(251, 191, 36, 0.4)"
              strokeWidth="2"
              className="energy-flow"
              style={{
                strokeDasharray: "10, 5",
                animationDelay: `${index * 0.3}s`,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function ProfileBranding() {
  const [activeTab, setActiveTab] = useState("about")

  // WhatsApp link
  const whatsappLink = "https://wa.me/201012808563?text=Hello! I'd like to discuss a project with you."

  // Skills data
  const skills = [
    { name: "Data visualization", level: 95, color: "bg-blue-400" },
    { name: "Reporting &analysis", level: 90, color: "bg-blue-500" },
    { name: "Databases", level: 85, color: "bg-purple-400" },
    { name: "Decision making ", level: 80, color: "bg-green-400" },
    { name: "Business intelligence ", level: 75, color: "bg-yellow-400" },
    { name: "Python for data analysis", level: 70, color: "bg-orange-400" },
    { name: "Statistics", level: 95, color: "bg-blue-400" },
    { name: " Problem-solving", level: 90, color: "bg-blue-500" },
    { name: "Intelligence Decision support system ", level: 85, color: "bg-purple-400" },
    { name: "Data mining ", level: 80, color: "bg-green-400" },
    { name: "Data warehousing ", level: 75, color: "bg-yellow-400" },
    { name: " Information technology", level: 70, color: "bg-orange-400" },
  ]

  // Projects data
  const projects = [
    {
      title: "Marketing Analysis",
      description: "A data-driven marketing analysis for May 2024, focusing on sales trends, customer behavior, and product performance. The insights helped identify top categories, measure engagement, and suggest operational improvements.",
      image: "/marketing_analysis.png?height=200&width=300",
      tech: ["Python"],
      status: "Live",
      link: "https://www.kaggle.com/code/farahsamymohamed/marketing-analysis",
      featured: true,
    },
    {
      title: "Global Economic Indicators Dashboard",
      description: "This project provides a visual exploration of global economic indicators, leveraging data extracted from The World Bank. It aims to present interactive insights into population, GDP, and temperature changes over time. The dashboard allows users to drill down into specific country data to reveal more detailed economic indicators.",
      image: "/global_indicatopr.png?height=200&width=300",
      tech: ["Power Bi", "Python", "Excel"],
      status: "Live",
      link: "https://github.com/eng-farah-samy/Global-Economic-Data-and-a-Polished-User-Experience",
      featured: true,
    },
    {
      title: "Bike Sales Dashboard",
      description: "A focused data analysis project aimed at exploring factors influencing bike purchases. The process involved data cleaning, handling missing values, and visualizing key relationships—such as age, income, and community distance—to uncover insights and trends that drive customer buying behavior.",
      image: "/Bike sales.png?height=200&width=300",
      tech: ["Power Bi", "Python", "Excel"],
      status: "Live",
      link: "https://github.com/eng-farah-samy/Bikes-Dataset",
      featured: false,
    },
    {
      title: "Cars Sales Analysis",
      description: "This is the Car sales data set which includes information about different cars. This data set is being taken from Analytixlabs for the purpose of prediction My task is to analyze this dataset and provide insights to see which feature has more impact on car sales and carry out the result of this ",
      image: "/car_sales.png?height=200&width=300",
      tech: ["Power Bi", "Python", "Excel"],
      status: "Live",
      link: "https://github.com/eng-farah-samy/Car-sales",
      featured: false,
    },
    {
      title: "Pizza Sales Analysis",
      description: "An interactive sales analysis for a pizza restaurant, focused on identifying best-selling items, peak order times, and customer preferences. Using data visualization and Python libraries, the project delivers actionable insights to optimize menu offerings and boost sales performance. ",
      image: "/pizza sales.png?height=200&width=300",
      tech: ["Power Bi", "Python", "Excel"],
      status: "Live",
      link: "https://github.com/eng-farah-samy/Pizza-Place-Sales-analysis",
      featured: false,
    },
  ]

  // Experience data
  const experience = [
    {
      title: "Data Analyst Specialist",
      company: "Misr Amreya Spinning & Weaving Co. s.a.e.",
      period: "2024 - Present",
      description: "Experienced in inventory and sales analysis to ensure efficient stock management. Skilled in handling purchasing processes and vendor negotiations, with a focus on high-demand products. Proficient in sales forecasting and designing marketing strategies aligned with seasonal trends. Also responsible for monitoring production operations, analyzing machine performance, and addressing downtime issues to enhance overall efficiency.",
      skills: ["Python", "Power Bi", "SAP System", "Excel", "SQL"],
    },
    {
      title: "Data Analyst Specialist",
      company: " Joprogrammer",
      period: "2021 - 2024",
      description: "Specialized in collecting, organizing, and performing statistical analysis on data to uncover actionable insights. Experienced in identifying trends to support continuous improvement. Proficient in automating daily reports using Power Query to streamline reporting processes and enhance decision-making.",
      skills: ["Python", "Power Bi", "Excel"],
    },
    {
      title: " Research and Development Analyst",
      company: "Alexandria Port Authority ",
      period: "2021 - 2021",
      description: "Handled data storage, retrieval, and analysis to evaluate system performance and requirements. Provided recommendations and plans for new system implementations and enhancements based on analytical insights.",
      skills: ["Excel", "Power Bi"],
    },
  ]

  // Stats data
  const stats = [
    { label: "Projects Completed", value: "50+", icon: <Briefcase className="h-6 w-6" /> },
    { label: "Years Experience", value: "5+", icon: <Calendar className="h-6 w-6" /> },
    { label: "Happy Clients", value: "60+", icon: <Users className="h-6 w-6" /> },
    { label: "Awards Won", value: "2", icon: <Award className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Particles Background - Full Screen */}
      <AnimatedParticles />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        {/* Neural Network only in hero section */}
        <HeroNeuralNetwork />
        <div className="relative max-w-6xl mx-auto px-4 py-20 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image and Info */}
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-blue-400/30 shadow-2xl shadow-blue-500/20">
                <AvatarImage src="/farah.png?height=96&width=96" alt="Farah" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                  Available for Work
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Farah Samy Mohamed
                  </span>
                </h1>
              </div>
            </div>

            {/* Description and Actions */}
            <div className="flex-1 space-y-8">
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                Data Analyst Specialist
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25"
                  onClick={() => window.open('/cv.pdf', '_blank')}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download CV
                </Button>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-500/25"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Let's Talk
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white hover:bg-slate-800 h-12 w-12 border border-slate-700"
                  onClick={() => window.open('https://github.com/eng-farah-samy', '_blank')}
                >
                  <Github className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white hover:bg-slate-800 h-12 w-12 border border-slate-700"
                  onClick={() => window.open('https://www.linkedin.com/in/farahsamy/', '_blank')}
                >
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white hover:bg-slate-800 h-12 w-12 border border-slate-700"
                  onClick={() => window.open('mailto:eng.farah.samy@gmail.com', '_blank')}
                >
                  <Mail className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800/70 transition-all border border-slate-700/50">
                  <div className="text-blue-400 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800 border border-slate-700">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              About Me
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Experience
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                    <Heart className="h-6 w-6 text-red-400" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    I Got my bachelor’s in management
                    information system from Faculty of Business English Section  . I have a great knowledge of Data and
                    Business and I expanded my skills when I chose the Data analysis Career to analyze this data to get
                    better insights.
                    As a data analyst, I am committed to using data to help organizations optimize their operations,
                    improve their products and services, and achieve their strategic goals. I have a strong background in
                    statistics, programming, and data visualization, I am skilled in using a variety of tools and
                    technologies, including SQL, Python, R, Tableau, and Excel.
                    In addition to my analytical skills, I also lead a dedicated team that supports businesses from the ground up.
                     We provide full services including website development, digital marketing, sales supervision, and comprehensive data analysis.
                     Our mission is to help companies grow and reach a competitive level in the market by making informed, data-driven decisions.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    When I'm not coding, you'll find me exploring new technologies, contributing to open source
                    projects, or enjoying a good cup of coffee while brainstorming the next big idea.
                  </p>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Coffee className="h-5 w-5" />
                    <span className="font-medium">Coffee enthusiast & problem solver</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                    <MapPin className="h-6 w-6 text-green-400" />
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span className="text-slate-300">eng.farah.samy@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">+20 101 280 8563</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-400" />
                    <span className="text-slate-300">Alexandria, Egypt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span className="text-slate-300">Available Worldwide</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${skill.color} rounded-full animate-pulse`}></div>
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    project.featured ? "ring-2 ring-blue-500/50" : ""
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge
                      className={`absolute top-4 right-4 ${
                        project.status === "Live" ? "bg-green-600 text-white" : "bg-orange-600 text-white"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-slate-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </Button> 
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-8">
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                    <Badge className="bg-slate-700 text-slate-300 w-fit border-slate-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-slate-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-slate-300">
            Let's create something amazing together. I'm always excited to work on new projects!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25"
              onClick={() => window.open('mailto:eng.farah.samy@gmail.com', '_blank')}
            >
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              onClick={() => window.open(whatsappLink, "_blank")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
