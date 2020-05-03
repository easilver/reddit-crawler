import {isEqual} from 'lodash'
import {
  formatCommentData,
  recursivelyNestCommentData
} from '../../src/data/callReddit'


  describe('comment data nesting method', () => {
    it('does not nest a flat list', () => {
      const testData= [
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          permalink: '',
          ups: 12
        }
      ]
    const formattedData = formatCommentData(testData)
    expect(isEqual(formattedData, testData)).toBe(true)
    })

    it('one level of correct nesting', () => {
      const testData= [
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      const expected = [
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          children: [
            {
              author: '',
              body: '',
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'B',
              parent_id: 'A',
              permalink: '',
              ups: 12
            },
            {
              author: '',
              body: '',
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'D',
              parent_id: 'A',
              permalink: '',
              ups: 12
            }
          ],
          depth: 0,
          downs: 5,
          id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          permalink: '',
          ups: 12
        }
      ]
    const formattedData = formatCommentData(testData)
    expect(isEqual(formattedData, expected)).toBe(true)
    })

    it('multiple levels of correct nesting', () => {
      const testData= [
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'B',
          permalink: '',
          ups: 12
        }
      ]
      const expected = [
        {
          author: '',
          body: '',
          created_utc: 1234353346,
          children: [
            {
              author: '',
              body: '',
              children: [
                {
                  author: '',
                  body: '',
                  created_utc: 1234353346,
                  depth: 0,
                  downs: 5,
                  id: 'D',
                  parent_id: 'B',
                  permalink: '',
                  ups: 12
                }
              ],
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'B',
              parent_id: 'A',
              permalink: '',
              ups: 12
            },
          ],
          depth: 0,
          downs: 5,
          id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          permalink: '',
          ups: 12
        }
      ]
    const formattedData = formatCommentData(testData)
    expect(isEqual(formattedData, expected)).toBe(true)
    })
  })

  describe('recursive method for nesting', () => {
    it('has no possible children', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const actual = recursivelyNestCommentData(testData, [])
      const expected = []
      expect(isEqual(actual, expected)).toBe(true)
    })

    it('has one child of parent', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const testList = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      const actual = recursivelyNestCommentData(testData, testList)
      expect(isEqual(actual, testList)).toBe(true)
    })

    it('has one child but it does not belong to the parent', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const testList = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'C',
          permalink: '',
          ups: 12
        }
      ]
      const actual = recursivelyNestCommentData(testData, testList)
      expect(isEqual(actual, [])).toBe(true)
    })

    it('multiple children (exclude unrelated children)', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const testList = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'E',
          permalink: '',
          ups: 12
        }
      ]
      const actual = recursivelyNestCommentData(testData, testList)
      const expected = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      expect(isEqual(actual, expected)).toBe(true)
    })

    it('two levels of nested children', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const testList = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          parent_id: 'B',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      const actual = recursivelyNestCommentData(testData, testList)
      const expected = [
        {
          author: '',
          body: '',
          children: [
            {
              author: '',
              body: '',
              children: [],
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'C',
              parent_id: 'B',
              permalink: '',
              ups: 12
            }
          ],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      expect(isEqual(actual, expected)).toBe(true)
    })

    it('multiple sets of multiple levels of nested children', () => {
      const testData = {
        author: '',
        body: '',
        created_utc: 1234353346,
        depth: 0,
        downs: 5,
        id: 'A',
        permalink: '',
        ups: 12
      }
      const testList = [
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'D',
          parent_id: 'B',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'E',
          parent_id: 'C',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'F',
          parent_id: 'D',
          permalink: '',
          ups: 12
        }
      ]
      const actual = recursivelyNestCommentData(testData, testList)
      const expected = [
        {
          author: '',
          body: '',
          children: [
            {
              author: '',
              body: '',
              children: [
                {
                  author: '',
                  body: '',
                  children: [],
                  created_utc: 1234353346,
                  depth: 0,
                  downs: 5,
                  id: 'F',
                  parent_id: 'D',
                  permalink: '',
                  ups: 12
                }
              ],
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'D',
              parent_id: 'B',
              permalink: '',
              ups: 12
            }
          ],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'B',
          parent_id: 'A',
          permalink: '',
          ups: 12
        },
        {
          author: '',
          body: '',
          children: [
            {
              author: '',
              body: '',
              children: [],
              created_utc: 1234353346,
              depth: 0,
              downs: 5,
              id: 'E',
              parent_id: 'C',
              permalink: '',
              ups: 12
            }
          ],
          created_utc: 1234353346,
          depth: 0,
          downs: 5,
          id: 'C',
          parent_id: 'A',
          permalink: '',
          ups: 12
        }
      ]
      expect(isEqual(actual, expected)).toBe(true)
    })
  })