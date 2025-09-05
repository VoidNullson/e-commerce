export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Vega Commerce. All rights reserved.</p>
      </div>
    </footer>
  )
}
