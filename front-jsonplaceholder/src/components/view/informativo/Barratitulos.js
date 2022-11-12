import { Container } from "react-bootstrap"

export default function Barratitulos({ titulo }) {
    return (
        <>
            <Container fluid={true} className='napaddin'>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">{titulo}</li>
                </ol>
            </Container>
        </>
    )
}