import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { FreeShippingProps } from '../../typings/free-shipping'


/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
    "globalFreeShippingContainer",
    "informativeFreeShippingText",
    "freeShippingProgressBar",
    "rangeFreeShippingContainer",
    "initialRangeFreeShippingText",
    "endRangeFreeShippingText"
] as const


const FreeShipping: StorefrontFunctionComponent<FreeShippingProps> = ({ valueOfFreeShipping, infoLabel, show }) => {

    // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
    const { orderForm: { totalizers } } = useOrderForm()
    let subTotal = totalizers.length === 0 ? 0 : totalizers[0].value

    const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
    const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)

    useEffect(() => {
        setMissingForFreeShipping(valueOfFreeShipping - subTotal <= 0 ? 0 : valueOfFreeShipping - subTotal)
        setPercentageForFreeShipping((subTotal * 100) /valueOfFreeShipping > 100 ? 100 : (subTotal * 100) /valueOfFreeShipping)
    }, [subTotal])

    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className = {`mw-100 pa2 ${handles.globalFreeShippingContainer}`}>
            {show.informativeFreeShippingText &&
                <p className = {`t-code mw9 ${handles.informativeFreeShippingText}`}> 
                    {show.labelInitial &&
                        infoLabel.labelInitial 
                    }
                    {show.subTotal &&
                        <FormattedCurrency value = {subTotal} /> 
                    }
                    &nbsp;
                    {show.labelBetween &&
                        infoLabel.labelBetween
                    } 
                    {show.missingForFreeShipping &&
                        <FormattedCurrency value = {missingForFreeShipping} /> 
                    }
                    &nbsp;
                    {show.labelFinal && 
                        infoLabel.labelFinal
                    }
                    &nbsp;
                </p>
            }
            {show.percentageFreeShipping &&
                <Progress type = "line" percent = {percentageForFreeShipping}  className = {handles.freeShippingProgressBar}/>
            }
            {show.rangeFreeShipping &&
                <div className = {`flex flex-wrap items-center justify-between mw-100 pa2 ${handles.rangeFreeShippingContainer}`}>
                    <p className = {`t-code mw9 w-80 ${handles.initialRangeFreeShippingText}`}> <FormattedCurrency value = {0} /> </p>
                    <p className = {`t-code mw9 w-20 ${handles.endRangeFreeShippingText}`}> <FormattedCurrency value = {valueOfFreeShipping} /> </p>
                </div>
            }
        </div>
    )
}


FreeShipping.defaultProps = {
    valueOfFreeShipping: 1,
    infoLabel: {
        labelInitial: "Valor actual:",
        labelBetween: "¡Faltan ",
        labelFinal: "para que su envío sea totalmente gratis!"
    },
    show: {
        informativeFreeShippingText: true,
        percentageFreeShipping: true,
        rangeFreeShipping: true,
        labelInitial: true,
        subTotal: true,
        labelBetween: true,
        missingForFreeShipping: true,
        labelFinal: true
    }
}


FreeShipping.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    valueOfFreeShipping: {
        title: "editor.countdown.valueOfFreeShipping.title",
        type: "number"
    },
    infoLabel: {
        title: "",
        type: "object",
        properties: {
            labelInitial: {
                title: "editor.countdown.infoLabel.labelInitial.title",
                type: "string"
            },
            labelBetween: {
                title: "editor.countdown.infoLabel.labelBetween.title",
                type: "string"
            },
            labelFinal: {
                title: "editor.countdown.infoLabel.labelFinal.title",
                type: "string"
            }
        }
    }
  }
}

export default FreeShipping