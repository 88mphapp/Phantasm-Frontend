import { Container, FormControl, FormLabel, Input, FormHelperText, Menu, MenuButton, MenuItem, Button, Image, Flex, MenuList, Center, Box, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { StablecoinTypes } from "../../types/Asset.types";
import { useState, useEffect } from "react";
import { CollateralTypes } from "../../types/Collateral.types";

const stablecoins = [
	{ symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", logo: "https://etherscan.io/token/images/MCDDai_32.png" },
	{ symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", logo: "https://etherscan.io/token/images/centre-usdc_28.png" },
	{ symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", logo: "https://etherscan.io/token/images/tether_32.png" },
	{ symbol: "GUSD", address: "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd", logo: "https://etherscan.io/token/images/gemini_28.png" },
];

type CollateralInputTypes = {
	isLong: boolean;
	assetSymbol: string;
	assetLogo: string | undefined;
};

export const CollateralInput = ({ isLong, assetSymbol, assetLogo, stablecoinAddress, setStablecoinAddress, stablecoinSymbol, setStablecoinSymbol, collateralAmount, setCollateralAmount }: CollateralInputTypes & StablecoinTypes & CollateralTypes) => {
	const [stablecoinLogo, setStablecoinLogo] = useState<string | undefined>("https://etherscan.io/token/images/MCDDai_32.png");

	useEffect(() => {
		if (isLong) {
			setStablecoinSymbol(assetSymbol);
			setStablecoinLogo(assetLogo);
		} else if (!isLong) {
			setStablecoinAddress(stablecoins[0].address);
			setStablecoinSymbol(stablecoins[0].symbol);
			setStablecoinLogo(stablecoins[0].logo);
		}
	}, [isLong, assetSymbol]);

	return (
		<Container>
			<Box marginBottom="12px">
				<Text>
					<strong>{isLong ? assetSymbol : stablecoinSymbol} Collateral Deposit</strong>
				</Text>
			</Box>
			<Flex>
				<FormControl width="60%">
					<Input type="number" min={0} placeholder="0.0" border="1px solid" borderColor="#161522" borderRadius="0.25rem" height="50px" maxHeight="50px" value={collateralAmount} onChange={(event) => setCollateralAmount(parseFloat(event.target.value))} />
					{/* <FormHelperText>{isLong ? assetSymbol : stablecoinSymbol} sent to lender.</FormHelperText> */}
				</FormControl>
				<Menu>
					<MenuButton as={Button} borderRadius="0.25rem" rightIcon={<ChevronDownIcon />} border="1px solid" borderColor="#161522" background="black" paddingY="24px" height="50px" disabled={isLong ? true : false}>
						<Flex align="center" marginRight="32px">
							<Image boxSize="1.5rem" src={stablecoinLogo} mr="12px" />
							{isLong ? assetSymbol : stablecoinSymbol}
						</Flex>
					</MenuButton>
					<MenuList id="tokenDropdown" backgroundColor="#161522" height="260px" minWidth="270px" overflowY="scroll">
						{stablecoins.map((token, index) => {
							return (
								<MenuItem
									minH="48px"
									onClick={() => {
										setStablecoinAddress(token.address);
										setStablecoinLogo(token.logo);
										setStablecoinSymbol(token.symbol);
									}}
								>
									<Image boxSize="1.5rem" src={token.logo} mr="12px" />
									<span>{token.symbol}</span>
								</MenuItem>
							);
						})}
					</MenuList>
				</Menu>
			</Flex>
		</Container>
	);
};
