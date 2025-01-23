import samyam from "../images/samyam.jpg";
import '../assets/Team.css'; 

export const Team = () => {
    return (
        <div className="team">
            <h1>Our Team</h1>
            <hr />
            <div className="members">
                <div className="team-mem">
                    <img src={samyam} alt="Samyam Pradhan" />
                    <h4>Samyam Pradhan</h4>
                </div>
                <div className="team-mem">
                    <img src={samyam} alt="Samyam Pradhan" />
                    <h4>Samyam Pradhan</h4>
                </div>
                <div className="team-mem">
                    <img src={samyam} alt="Samyam Pradhan" />
                    <h4>Samyam Pradhan</h4>
                </div>
            </div>
        </div>
    );
};
