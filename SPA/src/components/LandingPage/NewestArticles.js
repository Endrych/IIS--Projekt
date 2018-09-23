import React, { Component } from "react";
import { Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import { NavLink } from "react-router-dom";

import FavoriteGames from "./FavoriteGames.js";
import Fortnite from "../../data/favoriteGames/fortnite.jpg";
import Pubg from "../../data/favoriteGames/pubg.jpg";
import HearthStone from "../../data/favoriteGames/hs.jpg";
class NewestArticles extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0, data: [] };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === this.state.data.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? this.state.data.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}
	componentDidMount() {
		var newData = this.state.data;
		newData.push({
			id: "15456487",
			image: Fortnite,
			altText: "picture",
			text: "LIHASID ASI DHAIS ISA JDiajdw ijdiaj wiaj wdiaj diwajdoaiwjd iwja odijaw id",
			title: "NEW game out"
		});
		newData.push({
			id: "25123412",
			image: HearthStone,
			altText: "picture2",
			text: "213 21323wa ad weqe 123 123 asd asd213 2q  ewq ",
			title: "NEW Slice out"
		});
		newData.push({
			id: "41522287",
			image: Pubg,
			altText: "picture3",
			text: "asdasd212 13  diwajdoaiwjd iwja odijaw id",
			title: "NEW polek out"
		});
		this.setState({ data: newData });
		console.log(this.state);
	}

	render() {
		const { activeIndex } = this.state;

		const slides = this.state.data.map(item => {
			return (
				<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.id}>
					<NavLink to={"/news/" + item.id}>
						<img className="default-user" src={item.image} alt={item.altText} style={{ width: "960px", height: "400px" }} />
						<CarouselCaption captionText={item.text} captionHeader={item.title} />
					</NavLink>
				</CarouselItem>
			);
		});
		return (
			<Col className="favorite__game-wrapper" xs="12" sm="12">
				<Row>
					<Col className="" xs="12" sm="12" >
						<div className="favorite__title">Novinky</div>
					</Col>
				</Row>
				<Row>
					<Col className="" xs="12" sm="12">
						<Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
							<CarouselIndicators
								items={this.state.data}
								activeIndex={activeIndex}
								onClickHandler={this.goToIndex}
							/>
							{slides}
							<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
							<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
						</Carousel>
					</Col>
				</Row>
			</Col>
		);
	}
}

export default NewestArticles;
