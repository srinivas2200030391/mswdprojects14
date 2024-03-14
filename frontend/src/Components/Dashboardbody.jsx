import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import MainDash from "./MainDash";

const Dashboardbody = (props) => {
  const navigate = useNavigate();
  var state = props.state;
  const [selectedContent, setSelectedContent] = useState("");
  const handleNavigation = (id) => {
    console.log({ state });
    if (!{ state }) {
      setSelectedContent("");
      state = { id };
    } else {
      setSelectedContent(id);
    }
  };
  return (
    <div
      style={{
        marginTop: "-19px",
      }}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{
            backgroundColor: "rgba(243, 237, 237, 0.17)",
            height: "85vh",
            width: "85px",
            marginTop: "-40px",
          }}>
          <img
            src="Group 481782.png"
            style={{
              marginTop: "545px",
              verticalAlign: "bottom",
              cursor: "pointer",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: "rgba(199, 189, 189, 0.08)",
            height: "85vh",
            width: "300px",
            marginTop: "-40px",
          }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "18pt",
              paddingTop: "10pt",
            }}>
            Things to do
          </h3>
          <ul
            style={{
              fontSize: "15pt",
              paddingTop: "50pt",
            }}>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("Credit Card")}>
              <img src="Credit Card.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Credit Card
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}>
              <img src="Euro Money.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Easy Loans
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("debit cards")}>
              <img src="Credit Card.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Debit Card
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}>
              <img src="Request Money.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Deposit
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}>
              <img src="withdrawal.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Withdrawl
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}>
              <img src="Euro Money.png" />
              <p
                style={{
                  fontSize: "15pt",

                  paddingTop: "5pt",
                }}>
                Transfer
              </p>
            </li>
            <li
              style={{
                listStyleType: "none",
                padding: "10pt",
                display: "flex",
                cursor: "pointer",
              }}>
              <img
                src="Vector.png"
                style={{
                  marginLeft: "15px",
                }}
              />
              <p
                style={{
                  fontSize: "15pt",
                  paddingTop: "5pt",
                  marginLeft: "18pt",
                }}>
                Log Out
              </p>
            </li>
          </ul>
        </div>
        <div>
          {selectedContent === "" && <MainDash />}
          {selectedContent === "Credit Card" && <Cards />}
          {selectedContent === "debit cards" && <Cards />}
          {selectedContent === "deposits" && <Deposit />}
          {selectedContent === "withdrawal" && <Withdrawal />}
          {selectedContent === "transfer" && <Transfer />}
        </div>
      </section>
    </div>
  );
};

export default Dashboardbody;
