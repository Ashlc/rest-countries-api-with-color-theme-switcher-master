const formatPopulation = (val: string) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatPopulation;
