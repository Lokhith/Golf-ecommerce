import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

import { blogPosts } from "@/lib/blog-data"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found | GolfGearPro",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | GolfGearPro Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back to blog link */}
      <div className="container px-4 md:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>

      {/* Article header */}
      <article className="container px-4 md:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 mb-8">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">{post.author.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{post.author.role}</div>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Article content */}
          <div className="prose prose-green max-w-none dark:prose-invert prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-green-600 dark:prose-a:text-green-400 prose-img:rounded-xl">
            <p className="lead">{post.excerpt}</p>

            <h2>Understanding the Fundamentals</h2>
            <p>
              Golf is a game of precision, patience, and practice. Whether you're a beginner or looking to improve your
              existing skills, focusing on the fundamentals is essential. The proper grip, stance, and posture form the
              foundation of a good golf swing.
            </p>

            <p>
              Many golfers make the mistake of focusing too much on power rather than technique. A smooth, well-executed
              swing will naturally generate power and consistency. Take the time to work with a professional instructor
              who can help identify and correct any issues in your basic technique.
            </p>

            <h2>Equipment Considerations</h2>
            <p>
              Having the right equipment can make a significant difference in your game. Modern golf technology offers
              clubs designed for different skill levels and swing types. Getting properly fitted for clubs ensures that
              your equipment complements your natural swing and physical attributes.
            </p>

            <p>
              Don't overlook the importance of the right golf ball for your game. Different balls offer varying levels
              of distance, spin, and feel. Experiment with different options to find what works best for your playing
              style and skill level.
            </p>

            <h2>Mental Approach</h2>
            <p>
              The mental aspect of golf is just as important as the physical. Developing a pre-shot routine helps create
              consistency and builds confidence. Learn to visualize your shots before you take them, seeing the ball's
              flight path and landing spot in your mind.
            </p>

            <p>
              Managing expectations and emotions on the course is crucial. Golf is a challenging game with many
              variables. Accept that bad shots will happen and focus on the process rather than the outcome. This
              mindset will lead to more enjoyment and, ultimately, better scores.
            </p>

            <h2>Practice Strategies</h2>
            <p>
              Effective practice is about quality, not just quantity. Rather than hitting bucket after bucket of balls
              on the range, structure your practice sessions with specific goals and drills. Divide your time between
              different aspects of the game, including driving, iron play, short game, and putting.
            </p>

            <p>
              The short game deserves special attention, as it's where most strokes are saved or lost. Dedicate at least
              half of your practice time to putting, chipping, and pitching. Developing touch and feel around the greens
              will dramatically improve your scoring ability.
            </p>

            <h2>Course Management</h2>
            <p>
              Playing smart golf involves making strategic decisions that minimize risk and maximize your chances of
              success. Learn to assess risk versus reward for each shot, considering your abilities and the course
              conditions. Sometimes, the conservative play is the smart play.
            </p>

            <p>
              Understanding your tendencies and limitations allows you to play to your strengths. If you struggle with
              certain shots or situations, develop a game plan that avoids putting yourself in those positions. Golf is
              about playing the course in a way that suits your game.
            </p>

            <h2>Continuous Improvement</h2>
            <p>
              Track your performance to identify patterns and areas for improvement. Many apps and tools are available
              to help analyze your game statistically. This data-driven approach can reveal insights that might not be
              obvious during play.
            </p>

            <p>
              Finally, remember that improvement in golf is rarely linear. There will be plateaus and even temporary
              setbacks. Stay patient, trust the process, and enjoy the journey. The satisfaction of seeing your hard
              work pay off makes all the challenges worthwhile.
            </p>
          </div>

          {/* Share buttons */}
          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 my-8">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 dark:text-gray-300 font-medium">Share this article</div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Author bio */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">About {post.author.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.author.bio ||
                    `${post.author.name} is a golf enthusiast and expert with years of experience in the industry. They are passionate about helping golfers of all levels improve their game through practical advice and insights.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link key={index} href={`/blog/${relatedPost.slug}`} className="group">
                  <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                        {relatedPost.excerpt.length > 100
                          ? `${relatedPost.excerpt.substring(0, 100)}...`
                          : relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <Image
                            src={relatedPost.author.avatar || "/placeholder.svg"}
                            alt={relatedPost.author.name}
                            width={32}
                            height={32}
                            className="rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{relatedPost.author.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {relatedPost.readTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
