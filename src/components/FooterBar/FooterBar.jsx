import './FooterBar.css'

export default function FooterBar(){
  return (
    <div className="footer-bar">
      &copy; catseye {new Date().getFullYear()}
    </div>
  )
}