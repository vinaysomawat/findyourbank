import { useState, useEffect } from "react";
import {
	Col,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Input,
	notification,
} from "antd";
import { allbanksColumn } from "../../constants/table/allbanksColumn";
import { categories, cities } from "../../constants/customOptions";
import map from "lodash/map";
import get from "lodash/get";
import filter from "lodash/filter";
import includes from "lodash/includes";
import "./style.scss";
import { getAllBanksData } from "../../utility/api/banksDataAPI";
import { myLocalStorage } from "../../utility/localStorageWrapper";
import { useMyContext } from "../../utility/contextProvider/myContext";

const { Option } = Select;
const AllBanks = () => {
	const [citySelected, setCitySelected] = useState("MUMBAI");
	const [loading, setLoading] = useState(false);
	const [categorySelected, setCategorySelected] = useState(null);

	const {
		userData,
		addToFavorites,
		removeFromFavorites,
		banksData,
		setBanksData,
	} = useMyContext();

	const searchBanks = (query) => {
		let newData;
		if (categorySelected) {
			newData = filter(
				get(banksData, "initialData"),
				(bank) =>
					includes(
						String(bank[categorySelected]).toLowerCase(),
						query.toLowerCase()
					) // BANK_ID needs to be converted to string for includes function to work
			);
		} else {
			// if no category is selected then json.stringify the whole object and search in it everywhere

			newData = filter(get(banksData, "initialData"), (bank) => {
				let searchObject = JSON.stringify(bank);

				return includes(
					searchObject.toLowerCase(),
					query.toLowerCase()
				);
			});
		}

		setBanksData({ ...banksData, filteredData: newData });
	};

	useEffect(() => {
		setLoading(true);
		getAllBanksData(citySelected)
			.then((data) => {
				setLoading(false);
				setBanksData({ initialData: data, filteredData: data });
				myLocalStorage.setItem(
					citySelected,
					JSON.stringify(data),
					10000
				);
			})
			.catch((e) => {
				setLoading(false);
				notification.error({ message: "Something went wrong" });
			});
	}, [citySelected, setBanksData]);

	return (
		<Spin spinning={loading}>
			<div className="row">
				<div className="col-6">
					<div className="screen-title">All Banks</div>
				</div>
				<div className="col-6">
					<Row className="search-bar">
						<Col span={12} push={12}>
							<Row align="end">
								<Space>
									<Select
										value={citySelected}
										onChange={(value) =>
											setCitySelected(value)
										}
									>
										{map(cities, (city, i) => (
											<Option
												key={i}
												value={get(city, "value")}
											>
												{get(city, "label")}
											</Option>
										))}
									</Select>
									<Select
										value={categorySelected}
										onChange={(value) =>
											setCategorySelected(value)
										}
									>
										{map(categories, (category, i) => (
											<Option
												key={i}
												value={get(category, "value")}
											>
												{get(category, "label")}
											</Option>
										))}
									</Select>
								</Space>
							</Row>
						</Col>
						<Col span={12} pull={12}>
							<Input
								placeholder="Search"
								allowClear
								size="large"
								onChange={(e) => searchBanks(e.target.value)}
							/>
						</Col>
					</Row>
				</div>
			</div>

			<Table
				columns={allbanksColumn({
					addToFavorites,
					removeFromFavorites,
					userData,
				})}
				dataSource={get(banksData, "filteredData")}
			/>
		</Spin>
	);
};
export default AllBanks;
