


Vue.component('vega',{
	template : `
	  <div>
	    <div ref="vega"></div>
	    	<br>
	    	<!--variables-->
	    	<div>
		    	<!-- style -->
	    		<div>
	    			<label>Style:</label>
			    	<input v-model='vgStyle'>
		    	</div>


	    		<!--input values-->
	    		<div>
	    			<label>Input:</label>
			    	<textarea rows="8" cols="20" v-bind='values'>{{values}}</textarea>
		    	</div>

		    	<!-- axis -->
	    		<div>
	    			<h4>Axis:</h4>
	    			<label>X</label>
			    	<input v-model='x'>
			    	<label>Y</label>
			    	<input v-model='y'>
		    	</div>

		    	<!--title-->
	    		<div>
	    			<h4>Axis titles:</h4>
	    			<label>X</label>
			    	<input v-model='xtitle'>
			    	<label>Y</label>
			    	<input v-model='ytitle'>

			    	<h4>Description:</h4>
			    	<textarea rows="8" cols="20" v-bind='description'>{{description}}</textarea>
			    	

		    	</div>

		    	<div>

		    	</div>


		    	<!--spec values-->
	    		<div>
	    			<h4>Spec:</h4>
			    	<input v-model='spec'>
			    	<textarea rows="8" cols="20">{{spec}}</textarea>
		    	</div>
		    </div>
	  </div>`,
	props:{
		vgStyle:{type:String}
		},
	watch:{
		vgStyle:function(){
			this.parseJson()
		}
	},
	data:function(){
	      return {
	        url:'/getData/',
	        spec:{},
	        schema:"https://vega.github.io/schema/vega-lite/v2.json",
	        description:'',
	        xtitle:'',
	        ytitle:'',
	        values:{},
	        x:'a',
	        y:'b',
	        size:'',		// should be a field -> bubbleplot
	        color:'',		// should be a field
	        column:'' ,		// should be a field -> grouped bar chart field
	        aggregate:'',
	        calculate:'',
	        calculateVarName:'',
	        filter:'',
	        opacity:0.7,
			maxbins:10, //histogram
			domainWidth: 1, // grouped bar chart
			range: ["#EA98D2", "#659CCA"],  // grouped bar chart
			rangeStep: 12,    // grouped bar chart
			grid: false ,			// grouped bar chart
			}
		},
	mounted:function(){
		this.getData()
		},
    methods:{

	    parseJson:function(){
	      	var self = this;

	      	var opt = {
			  "mode": "vega-lite",
			  "renderer":"svg",
			  "actions":{"export":true,"source":false,"editor":false}
			};

			self.spec = createSpec(this.vgStyle, self);

			console.log(self.spec);

			vega.embed(self.$refs['vega'], self.spec, opt, function(error, result) {
			  // Callback receiving the View instance and parsed Vega spec
			  // result.view is the View, which resides under the '#vis' element
			});

	      
	    },

	    getData: function(){
	        var viewUrl = this.url;
	        var self = this;

	        $.ajax({
	           url: viewUrl,
	           method: 'GET',
	           success: function (resp) {
	                if (resp.error == false){
	                    //update input
	                    self.updateInput(resp);
	                }
	           },
	           error: function (error) {
	               console.log(error)
	           }
	        });
	    },

	    updateInput: function(i){
	      var t = i.data
	      console.log(t)
	      this.values = t;
	      this.parseJson();

	    }
  	}
});


var app = new Vue({
  el:'#app'
});
