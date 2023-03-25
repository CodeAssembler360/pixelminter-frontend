import React, { useContext } from "react";
import styled from "styled-components";

import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  ProgressBar,
  Modal,
  ModalHeader,
  InputGroup,
} from "react-bootstrap";
import teamImage from "assets/svg/team-building.svg";
import transactionConfirmedIcon from "assets/svg/transaction-confirmed-icon.svg";
import PageHeader from "./PageHeader";
import nftImage1 from "assets/svg/nftImage1.svg";
import nftImage2 from "assets/svg/nftImage2.svg";
import nftImage3 from "assets/svg/nftImage3.svg";
import axios from "axios";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/router";
import contractData from "./constants/contract.json";
import selective from "./constants/selective.json";
import sequential from "./constants/sequential.json";
import { useWeb3 } from "@3rdweb/hooks";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const CollectionPage = ({ setLoading }: any) => {
  const targetNetworkId = "0x1";
  const { user } = useContext(UserContext);
  // navigate("/login?redirect=profile/editProfile")
  const router = useRouter();
  const [down, setDown] = React.useState("");
  const [collection, setCollection] = React.useState([]);
  const [network, setNetwork] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [step, setStep] = React.useState("");
  const [accAddress, setAccAddress] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [data, setData] = React.useState([]);
  const [CollectionName, setCollectionName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [MintingCounter, setMinitngCounter] = React.useState("");
  const [MintingPrice, setMintingPrice] = React.useState("");
  const [MetadataURI, setMetadataURI] = React.useState("");
  const [collectionId, setCollectionId] = React.useState("");
  const [cidId, setCidId] = React.useState("");
  const [walletconnector, setWalletConnector] = React.useState({});
  const [method, setMethod] = React.useState("");
  const apiURL = "https://minter.pixeltrue.com/api";
  React.useEffect(() => {
    const collect = sessionStorage.getItem("collection");
    setStep(collect);
    console.log("coolevt", collect);
  }, []);
  React.useEffect(() => {
    getNft();
  }, []);

  React.useEffect(() => {
    getCid();
  }, []);
  const getCid = async () => {
    const collect = sessionStorage.getItem("pxl-token");
    axios
      .get(`${apiURL}/get/cid`, {
        headers: {
          Authorization: `Bearer ${collect}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          let arr = res.data.data;
          setData(arr);
          console.log("aeee", arr);
        }
      })
      .catch((err) => {
        console.log("err", collection);
      });
  };
  const getNft = async () => {
    const collect = sessionStorage.getItem("pxl-token");
    axios
      .get(`${apiURL}/get/allnfts`, {
        headers: {
          Authorization: `Bearer ${collect}`,
        },
      })
      .then((res) => {
        setCollection(res.data.data);
      })
      .catch((err) => {
        console.log("err", collection);
      });
  };
  console.log("datas", data);
  const deleteHandler = async () => {
    const collect = sessionStorage.getItem("pxl-token");
    await axios({
      method: "delete",
      url: `${apiURL}/delete/cid/${cidId}`,
      headers: {
        Authorization: `Bearer ${collect}`,
      },
    })
      .then((res) => {
        if (res.data) {
          setModal(false);
          getNft();
          getCid();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nftHandler = async (data) => {
    const collect = sessionStorage.getItem("pxl-token");
    await axios({
      method: "put",
      url: `${apiURL}/update/allnft/${collectionId}`,
      headers: {
        Authorization: `Bearer ${collect}`,
      },
      data: { addressDeployed: data, networkType: network },
    })
      .then((res) => {
        if (res.data) {
          deleteHandler();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://rinkeby.infura.io/v3/d5c5b1a8b44b4efc8fc8fa2f37af0fb1`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://rinkeby.infura.io/v3/d5c5b1a8b44b4efc8fc8fa2f37af0fb1`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const checkNetwork = async (data) => {
    // if (method == "1") {
    //   deploySequential();
    // } else {
    //   deploySelective();
    // }
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (network == "Polygon") {
        if (currentChainId == "0X137") {
          if (method == "1") {
            deploySequential();
          } else {
            deploySelective();
          }
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0x137",
                },
              ],
            });
            if (method == "1") {
              deploySequential();
            } else {
              deploySelective();
            }
          } catch (err) {
            console.log(err, "err");
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x89",
                    rpcUrls: ["https://polygon-rpc.com/"],
                    chainName: "Polygon Mainnet",
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://polygonscan.com/"],
                  },
                ],
              });
              if (method == "1") {
                deploySequential();
              } else {
                deploySelective();
              }
            } catch (error) {
              console.log(error, err);
            }
          }
        }
      } else if (network == "Ethereum") {
        if (currentChainId == targetNetworkId) {
          if (method == "1") {
            deploySequential();
          } else {
            deploySelective();
          }
        } else {
          console.log("here");

          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: targetNetworkId }],
          });
          if (method == "1") {
            deploySequential();
          } else {
            deploySelective();
          }
        }
      } else if (network == "Binance") {
        if (currentChainId == "0X56") {
          if (method == "1") {
            deploySequential();
          } else {
            deploySelective();
          }
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0X56",
                },
              ],
            });
            if (method == "1") {
              deploySequential();
            } else {
              deploySelective();
            }
          } catch (err) {
            console.log(err, "err");
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    rpcUrls: [
                      "https://endpoints.omniatech.io/v1/bsc/mainnet/public",
                    ],
                    chainName: "Binance Smart Chain Mainnet",
                    blockExplorerUrls: ["https://bscscan.com"],
                  },
                ],
              });
              if (method == "1") {
                deploySequential();
              } else {
                deploySelective();
              }
            } catch (error) {
              console.log(error, err);
            }
          }
        }
      } else if (network == "Arbitrum") {
        if (currentChainId == "0X42161") {
          if (method == "1") {
            deploySequential();
          } else {
            deploySelective();
          }
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0X42161",
                },
              ],
            });
            if (method == "1") {
              deploySequential();
            } else {
              deploySelective();
            }
          } catch (err) {
            console.log(err, "err");
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0xa4b1",
                    rpcUrls: [
                      "https://endpoints.omniatech.io/v1/arbitrum/one/public",
                    ],
                    chainName: "Arbitrum One",
                    blockExplorerUrls: ["https://arbiscan.io"],
                  },
                ],
              });
              if (method == "1") {
                deploySequential();
              } else {
                deploySelective();
              }
            } catch (error) {
              console.log(error, err);
            }
          }
        }
      } else {
      }
    }
  };

  const deploySequential = async () => {
    if (
      CollectionName == "" &&
      MetadataURI == "" &&
      symbol == "" &&
      MintingCounter == "" &&
      MintingPrice == ""
    ) {
    } else {
      setLoading(true);
      const provider = await walletconnector.method.activate();
      const web3 = new Web3(provider.provider);
      const contract = new web3.eth.Contract(
        contractData.abi,
        contractData.contractAddress
      );
      const address = await web3.eth.getAccounts();

      const tx = {
        to: contractData.contractAddress,
        from: address[0],
      };
      let gasfee = await contract.methods
        .deploySequential(
          CollectionName,
          symbol,
          MetadataURI,
          MintingCounter,
          MintingPrice
        )
        .estimateGas(tx);
      console.log(gasfee);
      tx.gas = web3.utils.toHex(gasfee);

      try {
        const transaction = await contract.methods
          .deploySequential(
            CollectionName,
            symbol,
            MetadataURI,
            MintingCounter,
            MintingPrice
          )
          .send(tx);
        console.log("transactions", transaction);
        const newContractAddress = transaction.events[0].address;
        if (typeof newContractAddress !== undefined) {
          if (transaction.status == true) {
            setLoading(false);
            nftHandler(newContractAddress);
            console.log("addreesas", newContractAddress);
            setAddress(newContractAddress);
            setActive(true);
          }
        } else {
          setLoading(false);
          setAddress("transaction failed");
        }
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const deploySelective = async () => {
    if (
      CollectionName == "" &&
      MetadataURI == "" &&
      symbol == "" &&
      MintingCounter == "" &&
      MintingPrice == ""
    ) {
    } else {
      setLoading(true);
      const provider = await walletconnector.method.activate();
      // console.log(provider.provider);
      const web3 = new Web3(provider.provider);
      const contract = new web3.eth.Contract(
        contractData.abi,
        contractData.contractAddress
      );
      const address = await web3.eth.getAccounts();

      const tx = {
        to: contractData.contractAddress,
        from: address[0],
      };
      let gasfee = await contract.methods
        .deploySelective(
          CollectionName,
          symbol,
          MetadataURI,
          MintingCounter,
          MintingPrice
        )
        .estimateGas(tx);
      console.log(gasfee, "gas fee");
      tx.gas = web3.utils.toHex(gasfee);
      try {
        const transaction = await contract.methods
          .deploySelective(
            CollectionName,
            symbol,
            MetadataURI,
            MintingCounter,
            MintingPrice
          )
          .send(tx);
        console.log("transactions", transaction);
        const newContractAddress = transaction.events[0].address;
        if (typeof newContractAddress !== undefined) {
          if (transaction.status == true) {
            setLoading(false);
            nftHandler(newContractAddress);
            console.log("addreesas", newContractAddress);
            setAddress(newContractAddress);
            setActive(true);
          }
        } else {
          setLoading(false);
          setAddress("transaction failed");
        }
      } catch (err) {
        setLoading(false);

        console.log("user denied");
      }
      // setLoading(false);
    }
  };
  const downloadHandler = async () => {
    if (
      sessionStorage.getItem("wallet") !== "undefined" &&
      sessionStorage.getItem("wallet")
    ) {
      setAccAddress(sessionStorage.getItem("wallet"));
      if (sessionStorage.getItem("item") == "Connect Metamask Wallet") {
        setWalletConnector({ method: Injected });
      } else if (sessionStorage.getItem("item") == "Connect Coinbase Wallet") {
        setWalletConnector({ method: CoinbaseWallet });
      } else {
        setWalletConnector({ method: WalletConnect });
      }
      setModal(true);
    }
  };
  const saveHandler = (e) => {
    e.preventDefault();
    setModal(false);
    setActive(true);
    // saveAs(down);
  };
  const hideHandler = () => {
    setActive(false);
    setModal(false);
  };
  const changeHandler = (e) => {
    if (e.target.value !== "") {
      setCollectionName(e.target.value);
      let arr = data.find((x) => x.collectionName === e.target.value);
      setMetadataURI(`https://${arr.cid}`);
      setCollectionId(arr.nftId);
      setCidId(arr._id);
    } else {
      setCollectionName(e.target.value);
      setMetadataURI("");
      setCollectionId("");
      setCidId("");
    }
  };
  console.log("nftid", collectionId);
  return (
    <>
      <PageHeader title="Your Collection" />
      <Container>
        <TextContainer>
          <Text>{collection.length} Collections</Text>
          {data.length > 0 && (
            <Button onClick={downloadHandler}>SmartContract Deploy</Button>
          )}
        </TextContainer>
        <Row className="py-5 ">
          {collection.length > 0 &&
            collection.map((item, i) => (
              <Col lg={4} style={{ marginBottom: "10px" }}>
                <Card className="card-s3">
                  <Card.Body>
                    {item.collectionName !== "" && (
                      <Card.Title
                        style={{ marginBottom: "2px", textAlign: "center" }}
                      >
                        Collection Name: {item.collectionName}
                      </Card.Title>
                    )}
                    {item.networkType != "" ? (
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          fontWeight: "700",
                          color: "#726e6e",
                          fontStyle: "oblique",
                          wordBreak: "break-all",
                          // position: "relative",
                          height: "15px",
                        }}
                      >
                        Network Type : {item.networkType}
                      </p>
                    ) : (
                      <Card.Title
                        style={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          fontWeight: "600",
                          //  whiteSpace: "nowrap",
                          // position: "relative",
                          height: "15px",
                        }}
                      ></Card.Title>
                    )}
                    {item.addressDeployed != "" ? (
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          fontWeight: "700",
                          color: "#726e6e",
                          fontStyle: "oblique",
                          wordBreak: "break-all",
                          // position: "relative",
                          height: "38px",
                        }}
                      >
                        Smart Contract Deployed : {item.addressDeployed}
                      </p>
                    ) : (
                      <Card.Title
                        style={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          fontWeight: "600",
                          //  whiteSpace: "nowrap",
                          // position: "relative",
                          height: "38px",
                        }}
                      ></Card.Title>
                    )}
                    <Row>
                      {item.preview.map((img, i) => (
                        <Col xs={6}>
                          <Card>
                            <Card.Img src={img} />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "auto",
                        paddingTop: "10px",
                      }}
                    >
                      <Button href={item.url} target="blank">
                        Download Collection
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        {/* successful */}
        {(step == "free" || active == true) && (
          <Modal show={modal || active} centered onHide={hideHandler}>
            <ModalHeader closeButton />
            <Card className=" text-center" style={{ border: "none" }}>
              <Card.Body>
                <Card.Img
                  style={{ height: "150px", margin: "10px 0px" }}
                  variant="top"
                  src={transactionConfirmedIcon}
                />
                <Card.Title className="large fw-bold">
                  Smart Contract
                </Card.Title>
                <Card.Text>
                  Your Collections has been deployed sucessfully
                </Card.Text>
              </Card.Body>
              {/* <Button className="w-50 mx-auto">View Collections</Button> */}
            </Card>
          </Modal>
        )}
        {/* blockChain */}
        {data.length > 0 && (
          <Modal show={modal} centered onHide={() => setModal(false)}>
            <ModalHeader closeButton />
            <Block>
              <Heading>Add NFT's to BlockChain</Heading>
              <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Collection Name
                  </Form.Label>
                  <Form.Select onChange={changeHandler} value={CollectionName}>
                    <option value="">Select Collection Name</option>
                    {data.length > 0 &&
                      data.map((items) => (
                        <option value={items.collectionName}>
                          {items.collectionName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Collection Symbol
                  </Form.Label>
                  {/* <Form.Select aria-label="Default select example">
                    <option>Choose your collection symbol</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select> */}
                  <Form.Control
                    type="text"
                    placeholder="Enter Minting"
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Minting Count
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Minting"
                    onChange={(e) => setMinitngCounter(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Minimum Minting Fee(Ether)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Fee"
                    onChange={(e) =>
                      setMintingPrice(
                        Web3.utils.toWei(e.target.value + "", "ether")
                      )
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Metadata URL
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Url"
                    style={{ background: "whitesmoke", fontWeight: "600" }}
                    value={MetadataURI}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Deploy Contract
                  </Form.Label>
                  <GroupButton>
                    <Selection
                      onClick={() => {
                        checkNetwork();
                        setMethod(1);
                      }}
                    >
                      Random
                    </Selection>
                    <Selection
                      onClick={() => {
                        checkNetwork();
                        setMethod(1);
                      }}
                    >
                      Sequential
                    </Selection>
                    <Selection
                      onClick={() => {
                        checkNetwork();
                        setMethod(2);
                      }}
                    >
                      Selective(Manual)
                    </Selection>
                  </GroupButton>
                </Form.Group>
                <Form.Group className="mb-3 fs-6">
                  <Form.Label className="mb-0 fs-6 fw-normal text-muted">
                    Change Network
                  </Form.Label>
                  {/* <Form.Check type="radio" label="Ethereum" checked /> */}
                  <Form.Select
                    onChange={(e) => setNetwork(e.target.value)}
                    value={network}
                  >
                    <option value="">Select Network</option>
                    <option value="Ethereum">Ethereum Mainnet</option>
                    <option value="Polygon">Polygon Mainnet</option>
                    <option value="Binance">Binance</option>
                    <option value="Arbitrum">Arbitrum One</option>
                  </Form.Select>
                </Form.Group>
                <div className="text-center">
                  {/* <Button type="submit">Deploy SmartContract</Button> */}
                </div>
              </Form>
            </Block>
          </Modal>
        )}
      </Container>
    </>
  );
};
export default CollectionPage;

const Text = styled.p`
  color: #fd576c;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;
const Heading = styled.h2`
  font-size: 26px;
  font-weight: 700;
  padding: 0px;
  padding-bottom: 5px;
`;
const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Selection = styled.div`
  padding: 12px 20px;
  border-radius: 5px;
  background: #fd576c;
  border-color: #fd576c;
  border: 1px solid #fd576c;

  color: #fff;
  cursor: pointer;
`;
