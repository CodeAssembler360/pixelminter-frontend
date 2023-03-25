// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import uniqId from "uniqid";
import styled, { css } from "styled-components";
import SimpleBackdrop from "../SimpleBackdrop";
import {
  faSync,
  faTrashAlt,
  faCancel,
  faPen,
  faArrowDown,
  faArrowUp,
  faSquareMinus,
  faSquarePlus,
  faCheckCircle,
  faCircleXmark,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3 } from "@3rdweb/hooks";
import { ContainerSM, TextField, Select } from "components/elements";
import Upload from "./Upload";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  ModalHeader,
  Card,
} from "react-bootstrap";
import successIcon from "../../assets/svg/success-icon.svg";
import transactionConfirmedIcon from "../../assets/svg/features-2.svg";

import Spinner from "../Spinner";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import { id } from "ethers/lib/utils";
import { layer } from "@fortawesome/fontawesome-svg-core";
import { transactionErrored } from "@usedapp/core";
import { IconButton, Tooltip } from "@mui/material";

const apiURL = "https://minter.pixeltrue.com/api";

type Props = {
  onGenerate?: any;
  pricing?: any;
  onPricingClick?: any;
  count?: any;
  onCountChange?: any;
  onCountSave?: any;
  canChangeCount?: any;
  setActiveNft?: any;
  setActiveCollection?: any;
  activeNft?: any;
  activeCollection?: any;
  setActivePrice?: any;
  activePrice?: any;
};

const NewProject: React.FC<Props> = ({
  onGenerate,
  setActiveNft,
  setActiveCollection,
  activeCollection,
  activeNft,
  pricing,
  onPricingClick,
  count,
  onCountChange,
  onCountSave,
  canChangeCount,
  setActivePrice,
  activePrice,
}) => {
  const { user } = useContext(UserContext);

  const { address } = useWeb3();

  const [layers, setLayers] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState([]);
  const [walletconnector, setWalletConnector] = React.useState({});
  const [collection, setCollection] = React.useState("");
  const [step, setStep] = React.useState(0);
  const [rarity, setRarity] = React.useState([]);
  const [layerModal, setLayerModal] = React.useState(false);
  const [data, setData] = useState([]);

  // const [drop, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [nftCount, setNftCount] = React.useState(false);
  const targetNetworkId = "0x1";
  const handleProcessGenerating = React.useCallback(() => {
    onGenerate({ layers: layers, items: items, count: count });
  }, [layers, items, count]);
  // useEffect(()=>{
  //   getEthereumn()
  // },[])
  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://rinkeby.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://rinkeby.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const getEthereumn = async () => {
    await axios
      .get(`${apiURL}/getEthereum`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          if (pricing == "upfront") {
            let upfront = 0.1;
            let final;
            let a = 1;
            let value = res.data.data[1].quote.USD.price;
            if (typeof value !== undefined) {
              a = a / value;
              upfront = upfront * count;
              final = a * upfront;
              let data = final.toFixed(6).toString();
              setOpen(true);
              checkNetwork(data);

              // handleLayerSync(data);
            }
          } else {
            let minting = 0.05;
            let final;
            let a = 1;
            let value = res.data.data[1].quote.USD.price;
            if (typeof value !== undefined) {
              a = a / value;
              minting = minting * count;
              final = a * minting;
              let data = final.toFixed(6).toString();
              setOpen(true);
              checkNetwork(data);
              // handleLayerSync(data);
            }
          }
        }
      })
      .catch((err) => {});
  };
  const checkNetwork = async (data) => {
    if (window?.web3?.currentProvider?.isMetaMask == true) {
      generatingHandler(data);

      // console.log("metamask");
      // const currentChainId = await window.ethereum.request({
      //   method: "eth_chainId",
      // });
      // if (currentChainId == targetNetworkId) {
      //   generatingHandler(data);
      // } else {
      //   await window.ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: targetNetworkId }],
      //   });
      //   generatingHandler(data);
      // }
    } else {
      // console.log("coinbase wlaa");

      generatingHandler(data);
    }
    // console.log("window", window.ethereum?.isCoinbaseWallet);
  };
  const generatingHandler = async (coins) => {
    if (pricing == "free") {
      setOpen(true);
      setOpen(true);
      handleLayerSync(coins);
      // generateNft(array);
    } else if (pricing === "minting-fee") {
      if (sessionStorage.getItem("item") == "Connect Metamask Wallet") {
        setWalletConnector({ method: Injected });
      } else if (sessionStorage.getItem("item") == "Connect Coinbase Wallet") {
        setWalletConnector({ method: CoinbaseWallet });
      } else {
        setWalletConnector({ method: WalletConnect });
      }
      const provider = await Injected.activate();
      const web3 = new Web3(provider.provider);
      const account = await web3.eth.getAccounts();
      const transaction = await web3.eth.sendTransaction(
        {
          from: account[0],
          value: web3.utils.toWei(coins),
          to: "0xF32F7C03a4D530935F5332CA5DC4a971149dda2E",
        },
        function (error, result) {
          if (error) {
            setOpen(false);
            // handle the "error" as a rejection
          }
        }
      );
      const checkvalue = await web3.eth.getTransaction(
        transaction.transactionHash
      );
      let transactionValue = checkvalue.value;
      transactionValue = transactionValue.slice(0, 2);
      const coinsfinalValue = parseInt(transactionValue);
      let coinData = coins * 1000000;
      coinData = coinData.toString();
      const coinValue = coinData.slice(0, 2);
      if (coinsfinalValue == coinValue) {
        if (typeof transaction !== undefined) {
          if (transaction.status == true) {
            await axios({
              method: "put",
              url: `${apiURL}/collection/payments`,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              data: { status: true },
            })
              .then((res) => {
                setStep(1);
                handleLayerSync(coins);

                // generateNft(array);
              })
              .catch((err) => {
                setOpen(false);
              });
          } else {
            setOpen(false);
          }
        } else {
          setOpen(false);
        }
      } else {
        generatingHandler(coins);
      }
    } else {
      if (sessionStorage.getItem("item") == "Connect Metamask Wallet") {
        setWalletConnector({ method: Injected });
      } else if (sessionStorage.getItem("item") == "Connect Coinbase Wallet") {
        setWalletConnector({ method: CoinbaseWallet });
      } else {
        setWalletConnector({ method: WalletConnect });
      }
      const provider = await Injected.activate();
      const web3 = new Web3(provider.provider);
      const account = await web3.eth.getAccounts();
      const transaction = await web3.eth.sendTransaction(
        {
          from: account[0],
          value: web3.utils.toWei(coins),
          to: "0xF32F7C03a4D530935F5332CA5DC4a971149dda2E",
        },
        function (error, result) {
          if (error) {
            setOpen(false);
            // handle the "error" as a rejection
          }
        }
      );
      const checkvalue = await web3.eth.getTransaction(
        transaction.transactionHash
      );
      let transactionValue = checkvalue.value;
      transactionValue = transactionValue.slice(0, 2);
      const coinsfinalValue = parseInt(transactionValue);
      let coinData = coins * 1000000;
      coinData = coinData.toString();
      const coinValue = coinData.slice(0, 2);
      if (coinsfinalValue == coinValue) {
        if (typeof transaction !== undefined) {
          if (transaction.status == true) {
            await axios({
              method: "put",
              url: `${apiURL}/collection/payments`,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              data: { status: true },
            })
              .then((res) => {
                setStep(1);
                handleLayerSync(coins);

                // generateNft(array);
              })
              .catch((err) => {
                setOpen(false);
              });
          } else {
            setOpen(false);
          }
        } else {
          setOpen(false);
        }
      } else {
        generatingHandler(coins);
      }
    }
  };

  const generateNft = async (array, layerOrder) => {
    console.log("layerOrder", layerOrder);

    if (pricing === "free") {
      await axios({
        method: "post",
        url: `${apiURL}/generate/nfts?collection=${count}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          number: array,
          collection: collection,
          layerOrder: layerOrder.slice().reverse(),
        },
      })
        .then((res) => {
          setStep(2);
          sessionStorage.setItem("collection", pricing);
          getUploadFile();
        })
        .catch((err) => {
          setOpen(false);
        });
    } else {
      await axios({
        method: "post",
        url: `${apiURL}/generate/nfts?collection=${count}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          number: array,
          collection: collection,
          layerOrder: layerOrder.slice().reverse(),
        },
      })
        .then((res) => {
          setStep(3);
          sessionStorage.setItem("collection", pricing);
          getUploadFile();
        })
        .catch((err) => {
          setOpen(false);
        });
    }
  };
  const getUploadFile = async () => {
    if (pricing == "minting-fee") {
      setStep(4);
      pinata();
    } else {
      await axios({
        method: "post",
        url: `${apiURL}/create/zip`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: { collection: collection },
      })
        .then((res) => {
          if (pricing == "free") {
            setStep(3);
            Router.push("/collection");
            // setOpen(false);
          } else {
            setStep(4);
            Router.push("/collection");
            // setOpen(false);
          }
        })
        .catch((err) => {
          setOpen(false);
        });
    }
  };
  const pinata = async () => {
    await axios({
      method: "post",
      url: `${apiURL}/upload/directories/pinata`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: { collection: collection },
    })
      .then((res) => {
        setStep(5);
        cid();
      })
      .catch((err) => {
        setOpen(false);
      });
  };
  const cid = async () => {
    await axios({
      method: "get",
      url: `${apiURL}/get/cid`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        setStep(6);
        sessionStorage.setItem("cid", res.data.data[0].cid);
        Router.push("/collection");
      })
      .catch((err) => {
        setOpen(false);
      });
  };
  const upLayer = async (from, to) => {
    let array = layers.slice();
    array.splice(from, 1, array.splice(to, 1, array[from])[0]);
    array.forEach((layer, index) => {
      array[index].order = array.length - index;
    });
    setLayers(array);
  };
  const downLayer = async (from, to) => {
    let array = layers.slice();
    array.splice(from, 1, array.splice(to, 1, array[from])[0]);
    array.forEach((layer, index) => {
      array[index].order = array.length - index;
    });
    setLayers(array);
  };
  const deleteLayer = async (data) => {
    const newLayers = [...layers.filter((x) => x.id !== data.id)];
    newLayers.forEach((layer, index) => {
      newLayers[index].order = newLayers.length - index;
    });
    const newItems = [...items.filter((x) => x.layerId !== data.id)];
    setLayers(newLayers);
    setItems(newItems);
  };

  const handleLayerCollapse = (id) => {
    const restLayers = layers.filter((x) => x.id !== id);
    const currentLayer = layers.filter((x) => x.id === id)[0];
    currentLayer.collapsed = !currentLayer.collapsed;

    const newLayers = [...restLayers, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };
  const handleLayerUp = (id) => {
    const layerIndex = layers.map((layer) => layer.id).indexOf(id);
    if (layerIndex === 0) return;

    const currentLayer = layers[layerIndex];
    const prevLayer = layers[layerIndex - 1];
    const restLayers = layers.filter(
      (x) => x.id !== id && x.id !== prevLayer.id
    );
    currentLayer.order += 1;
    if (prevLayer) prevLayer.order -= 1;

    const newLayers = [...restLayers, prevLayer && prevLayer, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };
  const handleLayerDown = (id) => {
    const layerIndex = layers.map((layer) => layer.id).indexOf(id);
    if (layerIndex > layers.length - 2) return;

    const currentLayer = layers[layerIndex];
    const nextLayer = layers[layerIndex + 1];
    const restLayers = layers.filter(
      (x) => x.id !== id && x.id !== nextLayer.id
    );
    currentLayer.order -= 1;
    if (nextLayer) nextLayer.order += 1;

    const newLayers = [...restLayers, nextLayer && nextLayer, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };
  const handleLayerDelete = (id) => {
    const newLayers = [...layers.filter((x) => x.id !== id)];
    newLayers.forEach((layer, index) => {
      newLayers[index].order = newLayers.length - index;
    });
    const newItems = [...items.filter((x) => x.layerId !== id)];
    setLayers(newLayers);
    setItems(newItems);
  };
  const handleItemChange = (e) => {
    const { value, name } = e.target;
    const id = e.target.getAttribute("id");

    const itemIndex = items.map((x) => x.id).indexOf(id);
    const newItems = [...items];
    newItems[itemIndex][name] = value;

    setItems(newItems);
  };
  const handleRarityChange = (e) => {
    const { value } = e.target;
    const id = e.target.getAttribute("id");

    const itemIndex = items.map((x) => x.id).indexOf(id);
    const newItems = [...items];
    newItems[itemIndex].rarity = value;

    setItems(newItems);
  };
  const handleRandomizePreview = () => {
    const allLayersIds = layers.map((x) => x.id);
    const setOfRandomLayers = [];

    allLayersIds.reverse().forEach((layerId) => {
      const layerItems = items.filter((item) => item.layerId === layerId);
      const randomIndex = Math.floor(Math.random() * layerItems.length);
      setOfRandomLayers.push({
        image: layerItems[randomIndex]?.image,
        id: layerItems[randomIndex]?.id,
        layerId: layerId,
      });
    });

    setPreview(setOfRandomLayers);
  };
  const handleSelectItem = ({ id, image, layerId }) => {
    const currentItemIndex = layers.map((x) => x.id).indexOf(layerId);
    if (currentItemIndex < 0) return;
  };
  const handleAddLayer = () => {
    const check = layers.filter((item) => item.name === "");
    if (check.length > 0 && check != undefined && layers.length > 0) {
      setData(check);
    } else {
      setData([]);
      const sorted = [...layers].sort((a, b) => a.order - b.order);
      const newLayer = {
        id: uniqId("layer-"),
        name: "",
        order:
          sorted && sorted.length > 0 ? sorted[sorted.length - 1].order + 1 : 1,
        collapsed: false,
      };
      setLayers((x) => [newLayer, ...x]);
    }
  };
  const handleLayerNameChange = (e) => {
    const { value } = e.target;
    const id = e.target.getAttribute("id");

    const restLayers = layers.filter((x) => x.id !== id);
    const currentLayer = layers.filter((x) => x.id === id)[0];
    currentLayer.name = value;

    const newLayers = [...restLayers, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };
  const handleUploadImage = async ({
    blobURL,
    imageURL,
    file,
    name,
    layerId,
    layerName,
    itemId,
  }) => {
    const newItem = {
      name: name.substr(0, name.lastIndexOf(".")).replace(/-/g, " "),
      image: blobURL,
      rarity: "common",
      metadata: name.substr(0, name.lastIndexOf(".")),
      layerId: layerId,
      layerName: layerName,
      order: layers.filter((layer) => layer.id === layerId)[0].order,
      id: itemId ? itemId : uniqId("item-"),
      file: file,
    };

    setItems((x) => [...x, newItem]);
    // handleLayerSync(layers)
  };

  React.useEffect(() => {
    const totalItemsByLayer = {};
    let totalUniqImages = 1;

    for (const { layerId } of items) {
      if (!totalItemsByLayer[layerId]) totalItemsByLayer[layerId] = 0;
      totalItemsByLayer[layerId] += 1;
    }

    Object.entries(totalItemsByLayer).forEach(([_key, value]) => {
      totalUniqImages = totalUniqImages * Number(value);
    });
  }, [preview]);

  const noLayers = layers.sort((a, b) => b.order - a.order).length === 0;

  const handleSubmit = (event) => {
    onCountSave;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [syncedLayers, setSyncedLayers] = React.useState([]);

  const removeImageHandler = (item) => {
    setItems(items.filter((x) => x.id !== item));
  };
  const countLayer = () => {
    const check = layers.find((item) => item.name === "");
    if (check == undefined) {
      console.log(check, "checjinh=====>");
      let array = [];
      let counts = 1;
      layers.map((layer, index) => {
        let arr = items.filter((x) => x.layerId === layer.id);
        let i = 0;
        arr.map((val) => {
          if (val.rarity == "common") {
            i = i + 1;
          } else if (val.rarity == "rare") {
            i = i + 3;
          } else {
            i = i + 2;
          }
        });
        array.push(i);
        if (index == layers.length - 1) {
          array.map((item, i) => {
            counts = counts * item;
            if (i == array.length - 1) {
              if (counts >= count) {
                if (pricing == "upfront" || pricing == "minting-fee") {
                  getEthereumn();
                } else {
                  handleLayerSync();
                }
              } else {
                setModal(true);
              }
            }
          });
        }
      });
    } else {
      setLayerModal(true);
    }
  };

  const handleLayerSync = async (coins) => {
    let array = [];
    let layerOrder = [];
    // layers.map(async (layer, index) => {
    for (let j = 0; j < layers.length; j++) {
      setOpen(true);
      let arr = items.filter((x) => x.layerId === layers[j]?.id);
      let i = 0;
      arr.map((val) => {
        if (val.rarity == "common") {
          i = i + 1;
        } else if (val.rarity == "rare") {
          i = i + 4;
        } else if (val.rarity == "uncommon") {
          i = i + 1;
        } else {
          i = i + 2;
        }
      });
      array.push(i);
      layerOrder.push({ name: layers[j]?.name, number: i });
      setRarity(array.reverse());

      const data = new FormData();
      data.append("name", layers[j]?.name);

      let value = items.filter((item) => item.layerId === layers[j]?.id);
      value.map((item, index) => {
        data.append("pics", item.file, item.file.name.replace(/-/g, " "));
      });

      for (const values of data.values()) {
      }
      await axios({
        method: "post",
        url: `${apiURL}/upload/pics/server`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
        redirect: "follow",
        data: data,
      })
        .then((response) => {
          if (j == layers.length - 1) {
            if (pricing == "free") {
              setStep(1);
              console.log("array", array);

              generateNft(array, layerOrder);
            } else {
              setStep(2);
              console.log("array", array);

              generateNft(array, layerOrder);
            }
          } else {
            setActive([...active, layer.id]);
            setLoading(false);
          }
        })
        .catch((err) => {
          setOpen(false);

          setLoading(false);
        });
    }
  };
  console.log(items, "l", layers);
  console.log("daya", data);
  const layercheck = () => {
    layers.filter((x) => x.name == "");
  };
  // React.useEffect(() => {

  // }, [layers]);
  return (
    <Root>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            <Col lg={12} xl={{ span: 10, offset: 1 }}>
              <Row>
                <Col xs={{ order: 2 }} lg={{ span: 4, order: 1 }} xl={5}>
                  <Preview className="mt-5 mt-lg-0">
                    <PreviewArea>
                      {!preview ? (
                        <PreviewInner>
                          <PreviewAreaText>
                            No Preview <br />
                            Available
                          </PreviewAreaText>
                        </PreviewInner>
                      ) : (
                        <>
                          {preview.map(({ image }, index) => (
                            <PreviewImage
                              key={`${image}-${index}`}
                              src={image}
                            />
                          ))}
                          <PreviewImageProtection />
                        </>
                      )}
                    </PreviewArea>
                    <PreviewFooter onClick={handleRandomizePreview}>
                      Randomize
                    </PreviewFooter>
                  </Preview>
                </Col>
                <Col
                  xs={{ order: 1 }}
                  lg={{ span: 7, offset: 1 }}
                  xl={{ span: 6, offset: 1 }}
                >
                  <Tools>
                    <Header disabled={!canChangeCount}>
                      <HeaderTitle>
                        Choose Pricing {pricing && `(${pricing.toUpperCase()})`}
                      </HeaderTitle>
                      <Button
                        className="rounded-pill btn-sm"
                        onClick={onPricingClick}
                        disabled={!canChangeCount}
                        active={activePrice}
                      >
                        Select
                      </Button>
                    </Header>
                    <Header disabled={!canChangeCount || !pricing}>
                      <HeaderTitle>How many NFT's</HeaderTitle>
                      <InputWrapper style={{ position: "relative" }}>
                        <Form.Control
                          width="100%"
                          size="sm"
                          type="number"
                          min="10"
                          max="10000"
                          placeholder="Enter Number"
                          value={`${count}`}
                          onChange={onCountChange}
                          id="count"
                          disabled={!canChangeCount || !pricing}
                          required
                        />
                      </InputWrapper>
                      <Tooltip
                        sx={{
                          right: "165px",
                          position: "absolute",
                        }}
                        placement="top"
                        title={
                          pricing == "free"
                            ? "Generate Upto 100 NFT"
                            : "Generate Upto 10,000 NFT"
                        }
                      >
                        <IconButton>
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{
                              color: "#fd576c",
                              height: "17px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="small"
                        onClick={() => {
                          setNftCount(true);
                          setActiveNft(true);
                        }}
                        active={activeNft}
                        className="rounded-pill btn-sm"
                        // disabled={count == ""}
                      >
                        Done
                      </Button>
                    </Header>
                    <Header
                      disabled={
                        !canChangeCount || !pricing || nftCount == false
                      }
                    >
                      <HeaderTitle>Collection Name*</HeaderTitle>
                      <InputWrapper>
                        <Form.Control
                          size="sm"
                          width={165}
                          type="text"
                          onChange={(e) => {
                            setCollection(e.target.value);
                            setActiveCollection(false);
                          }}
                          value={collection}
                          placeholder="Enter Collection Name (required)"
                          required
                        />
                      </InputWrapper>
                      <Button
                        active={activeCollection}
                        onClick={() => setActiveCollection(true)}
                        disabled={collection == ""}
                        className="rounded-pill btn-sm"
                      >
                        Done
                      </Button>
                    </Header>
                    <Header disabled={noLayers}>
                      <HeaderTitle>Size 500x500</HeaderTitle>
                      <Button
                        className="rounded-pill btn-sm"
                        onClick={countLayer}
                        disabled={
                          noLayers ||
                          layers.length == 0 ||
                          !pricing ||
                          collection == "" ||
                          count == ""
                        }
                      >
                        Generate Collection
                      </Button>
                    </Header>
                    {noLayers && (
                      <NoLayers
                      // disabled={canChangeCount}
                      >
                        <NoLayersTitle>No Layers Added Yet</NoLayersTitle>
                        <NoLayersText>
                          Start by adding a layer, for example background layer
                        </NoLayersText>
                        <NewLayerButton>
                          <Button
                            className="rounded-pill"
                            starticon="plus"
                            onClick={handleAddLayer}
                          >
                            Add Layer
                          </Button>
                        </NewLayerButton>
                      </NoLayers>
                    )}
                    {layers.length > 0 && (
                      <NewLayerButton>
                        <Button
                          className="rounded-pill"
                          starticon="plus"
                          onClick={handleAddLayer}
                        >
                          Add Layer
                        </Button>
                      </NewLayerButton>
                    )}
                    {layers.length > 0 &&
                      layers.map((layer, index) => (
                        <Layer key={layer.id}>
                          <LayerHeader>
                            <LayerHeaderTitle>
                              Layer {layer.order}:
                            </LayerHeaderTitle>
                            <TextField
                              width={144}
                              placeholder="Layer Name"
                              value={layer.name}
                              onChange={handleLayerNameChange}
                              id={layer.id}
                              disabled={syncedLayers.includes(layer.id)}
                            />
                            <LayerEditButtons>
                              <LayerEditButton
                                onClick={() => upLayer(index, index - 1)}
                                disabled={index == 0}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  style={{
                                    color: "#969CA8",
                                    height: "17px",
                                  }}
                                />
                              </LayerEditButton>
                              <LayerEditButton
                                onClick={() => downLayer(index, index + 1)}
                                disabled={index == layers.length - 1}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowDown}
                                  style={{
                                    color: "#969CA8",
                                    height: "17px",
                                  }}
                                />
                              </LayerEditButton>
                              {data.length > 0 &&
                                data.map(
                                  (x) =>
                                    x.id == layer.id && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "28px",
                                          left: "-157px",
                                          width: "170px",
                                          color: "red",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Layer Name Required
                                      </div>
                                    )
                                )}

                              <LayerEditButton
                                onClick={() => deleteLayer(layer)}
                                // disabled={
                                //   layer.name === "" ||
                                //   items.filter(
                                //     (item) => item.layerId === layer.id
                                //   ).length === 0 ||
                                //   syncedLayers.includes(layer.id)
                                // }
                              >
                                <FontAwesomeIcon
                                  style={{
                                    color: "#969CA8",
                                    height: "17px",
                                  }}
                                  icon={faTrashAlt}
                                />
                              </LayerEditButton>
                            </LayerEditButtons>
                          </LayerHeader>
                          <LayerContent
                            style={{
                              display: layer.collapsed ? "none" : "block",
                            }}
                          >
                            {items
                              .filter((item) => item.layerId === layer.id)
                              .map((item) => (
                                <LayerItem key={item.id}>
                                  <LayerItemImage
                                    image={item.image}
                                    onClick={() =>
                                      handleSelectItem({
                                        id: item.id,
                                        image: item.image,
                                        layerId: item.layerId,
                                      })
                                    }
                                  >
                                    <Icons
                                      onClick={() =>
                                        removeImageHandler(item.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        color="red"
                                        style={{
                                          background: "white",
                                          borderRadius: "13px",
                                          height: "18px",
                                        }}
                                      />
                                    </Icons>
                                  </LayerItemImage>
                                  <LayerItemOptions>
                                    <LayerItemOption>
                                      <LayerItemTextField>
                                        <TextField
                                          placeholder="Image Name"
                                          label="Image Name"
                                          value={item.name}
                                          id={item.id}
                                          name="name"
                                          onChange={handleItemChange}
                                        />
                                      </LayerItemTextField>
                                    </LayerItemOption>
                                    <LayerItemOption>
                                      <LayerItemTextField>
                                        <Select
                                          label="Rarity"
                                          value={item.rarity}
                                          onChange={handleRarityChange}
                                          id={item.id}
                                          options={[
                                            {
                                              value: "common",
                                              label: "Common",
                                            },
                                            {
                                              value: "uncommon",
                                              label: "Uncommon",
                                            },
                                            {
                                              value: "rare",
                                              label: "Rare",
                                            },
                                            {
                                              value: "superrare",
                                              label: "Super Rare",
                                            },
                                          ]}
                                        />
                                      </LayerItemTextField>
                                    </LayerItemOption>
                                    <LayerItemOption>
                                      <LayerItemTextField>
                                        <TextField
                                          placeholder="Metadata"
                                          value={item.metadata}
                                          id={item.id}
                                          width={96}
                                          name="metadata"
                                          onChange={handleItemChange}
                                        />
                                      </LayerItemTextField>
                                    </LayerItemOption>
                                  </LayerItemOptions>
                                </LayerItem>
                              ))}
                            {!syncedLayers.includes(layer.id) && (
                              <Upload
                                itemId={undefined}
                                layerId={layer.id}
                                layerName={layer.name}
                                onUpload={handleUploadImage}
                                address={address}
                              />
                            )}
                          </LayerContent>
                        </Layer>
                      ))}
                  </Tools>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
      {modal && (
        <Modal show={modal} centered onHide={() => setModal(false)}>
          <ModalHeader closeButton />
          <Card className=" text-center" style={{ border: "none" }}>
            <Card.Body>
              <Card.Img
                style={{
                  height: "150px",
                  margin: "10px 0px",
                  marginBottom: "20px",
                }}
                variant="top"
                src={transactionConfirmedIcon}
              />
              <Card.Title className="large ">
                Kindly increase the layers to generate {count} NFT's
              </Card.Title>
              {/* <Card.Text lassName="large ">
           Kindly increase the layers to generate ${count} NFT's
           </Card.Text> */}
            </Card.Body>
            {/* <Button className="w-50 mx-auto">View Collections</Button>  */}
          </Card>
        </Modal>
      )}
      {layerModal && (
        <Modal show={layerModal} centered onHide={() => setLayerModal(false)}>
          <ModalHeader closeButton />
          <Card className=" text-center" style={{ border: "none" }}>
            <Card.Body>
              <Card.Img
                style={{
                  height: "150px",
                  margin: "10px 0px",
                  marginBottom: "20px",
                }}
                variant="top"
                src={transactionConfirmedIcon}
              />
              <Card.Title className="large ">
                Layer name is required for generating NFT
              </Card.Title>
            </Card.Body>
          </Card>
        </Modal>
      )}
      <SimpleBackdrop
        open={open}
        setOpen={setOpen}
        step={step}
        pricing={pricing}
      />
    </Root>
  );
};

export default NewProject;

const Root = styled.div`
  padding-top: 58px;
  padding-bottom: 45px;
`;

const Workspace = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Preview = styled.div`
  position: sticky;
  top: 20px;
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
`;

const PreviewImageProtection = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PreviewArea = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

const PreviewInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const PreviewFooter = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  padding: 12px;
  background: #fd576c;
  border: 1px solid #fd576c;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

const PreviewAreaText = styled.div`
  color: #0e234b;
  font-size: 24px;
  font-weight: 700;
`;

const Tools = styled.div`
  width: 100%;
`;

const Header = styled.div<{ disabled?: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  padding: 10px 30px;
  margin-bottom: 20px;

  ${({ disabled }) =>
    disabled &&
    css`
      &:after {
        content: "";
        display: block;
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        opacity: 0.5;
      }
    `}
`;

const HeaderRow = styled.div<{ justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
  width: 100%;
  flex: 1 1 auto;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  color: #0e234b;
  font-size: 16px;
`;

const NewLayerButton = styled.div`
  text-align: center;
  margin-top: 35px;
`;

const NoLayersTitle = styled.div`
  text-align: center;
  font-weight: 700;
  color: #0e234b;
  font-size: 24px;
  margin-bottom: 16px;
`;

const NoLayersText = styled.div`
  text-align: center;
  font-size: 16px;
`;

const Layer = styled.div`
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  padding: 32px 34px;
  margin-top: 30px;
`;

const NoLayers = styled(Layer)<{ disabled: boolean }>`
  position: relative;
  padding: 38px 50px 40px;

  ${({ disabled }) =>
    disabled &&
    css`
      &:after {
        content: "";
        display: block;
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        opacity: 0.5;
      }
    `}
`;

const LayerHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LayerHeaderTitle = styled.div`
  font-weight: 700;
  padding-top: 6px;
  padding-right: 15px;
  padding-left: 6px;
  white-space: nowrap;
`;

const LayerHeaderButton = styled.div`
  width: 27px;
  height: 27px;
  text-align: center;
  transform: rotate(90deg);
  font-size: 17px;
  font-weight: 700;
  margin-left: 10px;
  cursor: pointer;
`;

const LayerContent = styled.div`
  padding-top: 26px;
`;

const LayerItem = styled.div`
  display: flex;
  /* margin-bottom: 28px; */
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LayerItemImage = styled.div<{ image: string; selected?: boolean }>`
  flex: 0 0 130px;
  width: 130px;
  height: 130px;
  margin-right: 22px;
  border-radius: 6px;
  position: relative !important;
  background: url(${({ image }) => image}) no-repeat 50%,
    url(/images/png-grid.jpg) no-repeat 0 0;
  background-size: cover, cover;
  border: 1px solid ${({ selected }) => (selected ? "#0E234B" : "#ffffff")};
`;

const LayerItemOptions = styled.div``;
const Icons = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
  cursor: pointer;
`;

const LayerItemOption = styled.div`
  /* margin-bottom: 10px; */
  margin-bottom: 9px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LayerItemTextField = styled.div`
  width: 144px;
`;

const LayerEditButtons = styled.button`
  position: relative;
  display: flex;
  padding-left: 20px;
  margin-right: auto;
`;

const LayerEditButton = styled.button<{ disabled?: boolean }>`
  width: 27px;
  height: 27px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  opacity: 0.4;
  ${({ disabled }) =>
    !disabled &&
    css`
      opacity: 1;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `}
`;

const InputWrapper = styled.div`
  width: 165px;
  @media (max-width: 992px) and (min-width: 768px) {
    width: 332px;
  }
`;
const AuthorizeSection = styled(Layer)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  opacity: 0.9;
  font-size: 22px;
  font-weight: 700;
`;

// Modal
const ModalTitle = styled.h1`
  color: #fd576c;
  font-size: 50px;
  font-weight: bold;
`;
const ModalText = styled.h1`
  color: #6d6d72;
  font-size: 16px;
`;
