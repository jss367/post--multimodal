import React from 'react'
import data from './data'

import { Surface, Text } from '../../reactComponents/ui'
import { includes, flatten, mean, repeat, reverse, map, sum } from 'lodash'
import {
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
} from 'victory'

import photo1 from './dse/photo/1.png'
import photo2 from './dse/photo/2.png'

const photoDse = [photo1, photo2]

import aligned1 from './dse/aligned/1.png'
import aligned2 from './dse/aligned/2.png'

const alignedDse = [aligned1, aligned2]

import art1 from './dse/art/1.png'
import art2 from './dse/art/2.png'

const artDse = [art1, art2]

import political1 from './dse/political/1.png'
import political2 from './dse/political/2.png'

const politicalDse = [political1, political2]

import videoGamesMusic1 from './dse/videoGamesMusic/1.png'
import videoGamesMusic2 from './dse/videoGamesMusic/2.png'

const videoGamesMusicDse = [videoGamesMusic1, videoGamesMusic2]

import partial1 from './dse/partial/1.png'
import partial2 from './dse/partial/2.png'

const partialDse = [partial1, partial2]

import text1 from './dse/text/1.png'
import text2 from './dse/text/2.png'

const textDse = [text1, text2]

import lgbt1 from './dse/lgbt/1.png'
import lgbt2 from './dse/lgbt/2.png'

const lgbtDse = [lgbt1, lgbt2]

import nonPolitical1 from './dse/unrelated/1.png'
import nonPolitical2 from './dse/unrelated/2.png'

const nonPoliticalDse = [nonPolitical1, nonPolitical2]

export default class HumanLabels extends React.Component {
  state = { activeGroups: [] }

  componentWillMount() {
    if (this.props.activeGroups) {
      this.setState({ activeGroups: this.props.activeGroups })
    }
  }

  onToggleGroup = (group) => {
    const { activeGroups } = this.state

    if (activeGroups.length > 0 && activeGroups[0] === group) {
      this.setState({ activeGroups: [] })
    } else {
      this.setState({ activeGroups: [group] })
    }
  }

  render() {
    let {
      bins = [],
      heights = [],
      interpolation = 'catmullRom',
      title = '',
      labelCounts,
      labelNames = [],
      stackProps = {},
      children,
      colors,
      yAxisProps = {
        label: '',
      },
      probChart = false,
    } = data
    const neuronStd = 2.19
    const neuronMean = -2.33

    if (typeof window === 'undefined') {
      return null
    }

    const width = 1300
    const { activeGroups } = this.state
    const isGroupActive = (group) => includes(activeGroups, group)
    const hasActiveGroup = activeGroups.length > 0

    /*
    let confidenceIntervals = null
    if (hasActiveGroup) {
      const activeHeights = heights[activeGroups[0]]
      const totalValues = sum(activeHeights)
      const activeTotals = activeHeights.map(
        (height) => (height / totalValues) * labelCounts[activeGroups[0]]
      )

      const distribution = bins.slice(0, -1).map((bin, index) => ({
        samples: activeTotals[index],
        value: (bin + bins[index + 1]) / 2 / neuronStd,
      }))

      const totalDistribution = flatten(
        distribution.map(({ samples, value }) =>
          [...Array(Math.round(samples))].map((_, i) => value)
        )
      )

      function getStdDev(array) {
        var avg = sum(array) / array.length
        return Math.sqrt(
          sum(map(array, (i) => Math.pow(i - avg, 2))) / array.length
        )
      }
      const confidenceRange =
        (1.96 * getStdDev(totalDistribution)) /
        Math.sqrt(totalDistribution.length)
      const distributionMean = mean(totalDistribution)
      console.log('distribution is', totalDistribution)

      confidenceIntervals = [
        distributionMean - confidenceRange,
        distributionMean + confidenceRange,
      ]
    }
    */

    if (probChart) {
      yAxisProps.tickFormat = (t) => `${t.toExponential()}`
      yAxisProps.dy = -30
      stackProps.domain = { y: [0, 0.0000022] }
    }

    const colorSize = 15

    const iconSize = 65.1

    const Label = ({ index, dse, children, count }) => (
      <Surface
        cursor="pointer"
        marginRight={5}
        opacity={0.8}
        width={iconSize * 2}
        onClick={() => {
          this.onToggleGroup(index)
        }}
      >
        {(hovering) => {
          const showActive = hovering || isGroupActive(index)

          return (
            <Surface padding={6} background={showActive && 'rgba(0,0,0,0.06)'}>
              <Surface
                flexFlow="row"
                alignItems="center"
                transition="100ms ease-out all"
                paddingBottom={2}
                borderBottom={`6px solid ${colors[index]}`}
              >
                <Surface>
                  <Text
                    fontFamily="Arial"
                    fontWeight={600}
                    fontSize={12}
                    lineHeight={1.2}
                  >
                    {children}
                  </Text>
                  <Text
                    fontFamily="Arial"
                    fontSize={12}
                    fontWeight={400}
                    lineHeight={1.2}
                  >
                    {labelCounts[index]} images
                  </Text>
                </Surface>
              </Surface>
              {dse && (
                <Surface flexFlow="row">
                  {dse.slice(0, 2).map((img, imgIndex) => (
                    <div
                      style={{
                        borderBottom: '1px solid ' + colors[index],
                        borderRight: '1px solid ' + colors[index],
                        borderLeft:
                          imgIndex === 0 && '1px solid ' + colors[index],
                        width: iconSize,
                        height: iconSize,
                      }}
                    >
                      <img src={img} height={iconSize} width={iconSize} />
                    </div>
                  ))}
                </Surface>
              )}
            </Surface>
          )
        }}
      </Surface>
    )

    const Group = ({ name, children }) => {
      return (
        <Surface marginRight={10} marginLeft={-10}>
          <Text
            fontSize={14}
            opacity={1}
            fontWeight={600}
            textDecoration="uppercase"
          >
            {name}
          </Text>
          <Surface flexFlow="row" transform="translateX(-6px)">
            {children}
          </Surface>
        </Surface>
      )
    }
    /*
    'Video Games + Music',
    'Black + Gay Rights',
    'non-political',
    'Political generic',
    'Political trump aligned',
    'Trump Minor',
    'Trump Text',
    'Trump Art',
    'Trump Profile',
    */

    const footnote = (
      <d-footnote>
        As we were labeling images for the conditional probability plot in
        Figure 2 we were surprised that images related to black and gay rights
        consistently caused strong negative activations. However, since there
        were four images in that category, we decided to do a follow-up
        experiment on more images.
        <br />
        <br />
        We searched Google Images for the terms "black rights" and "gay rights"
        and took ten top images for each term without looking at their
        activations. Then we validated these images reliably cause the Trump
        neuron to fire in the range of roughly negative ~3-6 standard deviations
        from zero. The images that cause less strong negative activations near
        -3 standard deviations tend to have broad symbols such as an image of
        several black teenagers raising their arm and fist that causes a -2.5
        standard deviations. Conversely, images of more easy to recognize and
        specific symbols such as rainbow flags or photos of Martin Luther King
        Jr consistently cause activations of at least -4 standard deviations. In
        Figure 3 we also show activations related to photos of Martin Luther
        King Jr.
      </d-footnote>
    )

    return (
      <figure className="fullscreen-diagram" id="figure-2">
        <Surface width={width} margin="auto">
          <Surface flexFlow="row" marginLeft={60}>
            <Group name="Neutral">
              <Label index={8} dse={videoGamesMusicDse}>
                Games / Music
              </Label>
              <Label index={7} dse={lgbtDse}>
                Black / LGBT Rights
              </Label>
              <Label index={6} dse={nonPoliticalDse}>
                Non-Political
              </Label>
              <Label index={5} dse={politicalDse}>
                Political Generic
              </Label>
            </Group>
            <Group name="Related to Donald Trump">
              <Label index={4} dse={alignedDse}>
                Politics
              </Label>
              <Label index={3} dse={partialDse}>
                Partial Photo
              </Label>
              <Label index={2} dse={textDse}>
                Text
              </Label>
              <Label index={1} dse={artDse}>
                Art
              </Label>
              <Label index={0} dse={photoDse}>
                Profile Photo
              </Label>
            </Group>
          </Surface>
          <Surface
            width={width}
            alignSelf="center"
            transform="translateY(-20px)"
          >
            <VictoryChart width={width} height={400} {...stackProps}>
              <VictoryStack
                colorScale={colors}
                // interpolation={interpolation}
                // interpolation="none"
                animate={{
                  duration: 800,
                }}
              >
                {heights.map((height, index) => {
                  const isZero = hasActiveGroup && !isGroupActive(index)
                  const victoryData = bins
                    .map((binValue, bin) => {
                      if (isZero) return { y: 0, x: binValue / neuronStd }
                      return { x: binValue / neuronStd, y: height[bin] }
                    })
                    .filter((i) => i !== null)

                  return (
                    <VictoryGroup data={victoryData} key={index}>
                      <VictoryArea
                        // {...addInterpolation}
                        events={[
                          {
                            target: 'data',
                            eventHandlers: {
                              onClick: () => {
                                this.onToggleGroup(index)
                              },
                            },
                          },
                        ]}
                      />
                    </VictoryGroup>
                  )
                })}
              </VictoryStack>
              <VictoryAxis
                crossAxis={false}
                tickCount={17}
                axisLabelComponent={<VictoryLabel dy={7} />}
                label="Standard Deviations from Zero Activation"
              />

              <VictoryAxis
                axisLabelComponent={<VictoryLabel dy={-13} />}
                tickCount={5}
                offsetX={50}
                dependentAxis
                {...yAxisProps}
              />

              <VictoryLine
                style={{
                  data: { strokeWidth: 1, stroke: 'rgba(0, 0, 0, 0.6)' },
                }}
                data={[
                  { x: 0, y: 1 },
                  { x: 0, y: 0 },
                ]}
              />
            </VictoryChart>
          </Surface>
          <figcaption
            style={{
              width: 703,
              marginTop: -20,
              alignSelf: 'center',
            }}
          >
            <a
              href="#figure-2"
              class="figure-anchor"
              style={{ fontWeight: 'bold' }}
            >
              Figure 2:
            </a>{' '}
            To understand the Trump neuron in more depth, we collected about 650
            images that cause it to fire different amounts and labeled them by
            hand into categories we created. This lets us estimate the
            conditional probability of a label at a given activation level. See{' '}
            <a href="#conditional-probability">the appendix</a> for details. As
            the black / LGBT category contains only a few images, since they
            don't occur frequently in the dataset, we validated they cause
            negative activations with a futher experiment{footnote}.
            <br />
            <br /> Across all categories, we see that higher activations of the
            Trump neuron are highly selective, as more than 90% of the images
            with a standard deviation greater than 30 are related to Donald
            Trump.
          </figcaption>
        </Surface>
      </figure>
    )
  }
}
