
var createSpec = function(type,self){
	
	s = -1;

	// 1D plot
	if (type == 'plot'){

		s = {
		  	"$schema": self.schema,
		  	"description":self.description,
		  	"autoResize":true,
		  	"data": {"values": self.values},
		  	"mark": "point",
		  	"encoding": {
		    	"x": {"field": self.x, "type": "quantitative"}
		  		}
			}
		}

	// scatterplot
	if (type == 'scatterplot'){

		s = {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "point",
		  "encoding": {
		    "x": {"field": self.x,"type": "quantitative"},
		    "y": {"field": self.y,"type": "quantitative"}
		  }
		}
	}

	// scatterplot with color and shape
	if (type == 'colorAndSchapeScatterplot'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "point",
		  "encoding": {
		    "x": {"field": self.x,"type": "quantitative"},
		    "y": {"field": self.y,"type": "quantitative"},
		    "color": {"field": self.color, "type": "nominal"},
    		"shape": {"field": self.shape, "type": "nominal"}
		  }
		}
	}

	// scatterplot using label letter 
	if (type == 'textScatterplot'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "transform": [{
		    "calculate": self.calculate, //creer une clef label
		    "as": self.calculateVarName
		  }],
		  "mark": "text",
		  "encoding": {
		    "x": {"field": self.x, "type": "quantitative"},
		    "y": {"field": self.y, "type": "quantitative"},
		    "color": {"field": self.calculateVarName, "type": "nominal"},
		    "text": {"field": self.calculateVarName, "type": "nominal"}
		  }
		}
	}


	// bubbleplot
	if (type == 'bubbleplot'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "point",
		  "encoding": {
		    "x": {"field": self.x,"type": "quantitative"},
		    "y": {"field": self.y,"type": "quantitative"},
		    "size": {"field": self.size,"type": "quantitative"},
		  }
		}
	}

	// single bar chart
	if (type == 'singleBarChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "bar",
		  "encoding": {
		    "x": {"axis": {"title": self.xtitle},"field": self.x,"aggregate":"sum","type": "quantitative"},
		  }
		}
	}

	// horizontal bar chart
	if (type == 'horizontalBarChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "bar",
		  "encoding": {
		    "x": { "axis": {"title": self.xtitle}, "field": self.x,"aggregate":"sum","type": "quantitative"},
		    "y": {"axis": {"title": self.ytitle},"field": self.y,"type": "ordinal","rangeStep":self.rangeStep},
		   
		  }
		}
	}

	// stacked bar chart
	if (type == 'stackedBarChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "transform": [
		    {"filter": self.filter},
		    {"calculate": self.calculate, "as": self.calculateVarName}
		  ],
		  "mark": "bar",
		  "encoding": {
			"y": {
		      "aggregate": "sum", "field": self.y, "type": "quantitative",
		      "axis": {"title": self.ytitle}
		    },
		    "x": {
		      "field": self.x, "type": "ordinal",
		      "scale": {"rangeStep": self.rangeStep}
		    },
		    "color": {
		      "field": self.calculateVarName, "type": "nominal",
		      "scale": {"range": self.range}
		    }
		  	}
		}
	}

	// layered bar chart
	if (type == 'layeredBarChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "transform": [
		    {"filter": self.filter},
		    {"calculate": self.calculate, "as": self.calculateVarName}
		  ],
		  "mark": "bar",
		  "encoding": {
				"y": {
			      "aggregate": "sum", "field": self.y, "type": "quantitative",
			      "axis": {"title": self.ytitle},"stack": "none"
			    },
			    "x": {
			      "field": self.x, "type": "ordinal",
			      "scale": {"rangeStep": self.rangeStep}
			    },
			    "color": {
			      "field": self.calculateVarName, "type": "nominal",
			      "scale": {"range": self.range}
			    },
			    "opacity":{"value": self.opacity}
		  	}
		}
	}

	// normalized bar chart
	if (type == 'normalizedBarChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "transform": [
		    {"filter": self.filter},
		    {"calculate": self.calculate, "as": self.calculateVarName}
		  ],
		  "mark": "bar",
		  "encoding": {
				"y": {
			      "aggregate": "sum", "field": self.y, "type": "quantitative",
			      "axis": {"title": self.ytitle},"stack": "normalize"
			    },
			    "x": {
			      "field": self.x, "type": "ordinal",
			      "scale": {"rangeStep": self.rangeStep}
			    },
			    "color": {
			      "field": self.calculateVarName, "type": "nominal",
			      "scale": {"range": self.range}
			    },
			    "opacity":{"value": self.opacity}
		  	}
		}
	}

	// grouped bar chart
	if (type == 'groupedBarChart'){

		s= {
		  "$schema": self.schema,
		  "data": { "url": self.values},
		  "transform": [
		    {"filter": self.filter},
		    {"calculate": self.calculate, "as": self.calculateVarName}
		  ],
		  "mark": "bar",
		  "encoding": {
		    "column": {
		      "field": self.column, "type": "ordinal"
		    },
		    "y": {
		      "aggregate": "sum", "field": self.y, "type": "quantitative",
		      "axis": {"title": self.ytitle, "grid": self.grid}
		    },
		    "x": {
		      "field": self.x, "type": "nominal",
		      "scale": {"rangeStep": self.rangeStep},
		      "axis": {"title": self.xtitle}
		    },
		    "color": {
		      "field": self.calculateVarName, "type": "nominal",
		      "scale": {"range": self.range}
		    },
		  },
		  "config": {
		    "facet": {"cell": {"strokeWidth": self.strokeWidth}},
		    "axis": {"domainWidth": self.domainWidth}
		  }
		}
	}


	// histogram
	if (type == 'histogram'){

		s= {
		  "$schema": self.schema,
		  "data": {"values": self.values},
		  "mark": "bar",
		  "encoding": {
		    "x": {
		      "bin": {"maxbins": self.maxbins},
		      "field": self.x,
		      "type": "temporal"
		    },
		    "y": {
		      "aggregate": "count",
		      "type": "quantitative",
		      "title":self.ytitle
		    }
		  }
		}
	}


	// heatmap
	if (type == 'heatmap'){

		s= {
		  "$schema": self.schema,
		  "data": {"values": self.values},
		  "mark": "rect",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "ordinal"},
		    "color": {
		      "aggregate": self.aggregate,
		      "field":self.color,
		      "type": "quantitative",
		    }
		  }
		}
	}

	// line chart
	if (type == 'lineChart'){

		s= {
		  "$schema": self.schema,
		  "description": self.description,
		  "data": {"values": self.values},
		  "mark": "line",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "quantitative"},
		  }
		}
	}

	// multi line chart
	if (type == 'multiLineChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "line",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "quantitative"},
		    "detail": {"field": self.detail, "type": "nominal"}
		  }
		}
	}

	// colored line chart
	if (type == 'coloredLineChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "line",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "quantitative"},
		    "color": {
		      "type": "nominal",
		      "field":self.color,
		  }
		}
	}
	}

	//area chart
	if (type == 'areaChart'){

		s= {
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "area",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "quantitative"},
		  }
		}
	}

	//stacked area chart
	if (type == 'stackedAreaChart'){

		s={
		  "$schema": self.schema,
		  "description":self.description,
		  "data": {"values": self.values},
		  "mark": "area",
		  "encoding": {
		    "x": {"field": self.x,"type": "ordinal"},
		    "y": {"field": self.y,"type": "quantitative"},
		    "color": {
		      "type": "nominal",
		      "field":self.color,
			  }
			}
		}
	}

	if (s != -1){return s};

}