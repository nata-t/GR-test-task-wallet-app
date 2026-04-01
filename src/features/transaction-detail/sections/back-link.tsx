import { Link } from "@tanstack/react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

export function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm text-primary"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </Link>
  )
}
